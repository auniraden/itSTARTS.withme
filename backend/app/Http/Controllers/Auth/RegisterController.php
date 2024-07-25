<?php

namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Controller;
use App\Models\User;
use App\Models\Child;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Mail;
use App\Mail\RegistrationConfirmation;
use App\Models\Role;
use Illuminate\Validation\ValidationException;
use Illuminate\Support\Facades\Log;

class RegisterController extends Controller
{
    public function registerHomeschooler(Request $request)
    {
        $request->validate([
            'first_name' => 'required|string|max:255',
            'last_name' => 'required|string|max:255',
            'email' => 'required|string|email|max:255|unique:users',
            'curriculum_id' => 'required|exists:curriculums,id'
        ]);

        try {
            $role = Role::firstOrCreate(['role_name' => 'homeschooler']);

            // Ensure $role is an object
            if (!is_object($role)) {
                throw new \Exception('Failed to create or retrieve the role.');
            }
            $user = User::create([
                'first_name' => $request->first_name,
                'last_name' => $request->last_name,
                'email' => $request->email,
                'role_id' => $role->id,
                'curriculum_id' => $request->curriculum_id,
            ]);

            // Send confirmation email
            Mail::to($user->email)->send(new RegistrationConfirmation($user));

            return response()->json(['message' => 'Registration successful, please check your email for confirmation.']);
        } catch (\Exception $e) {
            Log::error('Registration failed: ' . $e->getMessage());
            return response()->json(['error' => 'Registration failed.'], 500);
        }
    }

    public function registerParent(Request $request)
    {
        $request->validate([
            'first_name' => 'required|string|max:255',
            'last_name' => 'required|string|max:255',
            'email' => 'required|string|email|max:255|unique:users',
            'curriculum_id' => 'required|exists:curriculums,id',
            'number_of_kids' => 'required|integer|min:1',
            'children_emails' => 'array',
            'children_emails.*' => 'email|distinct'
        ]);

        try {
            $role = Role::firstOrCreate(['role_name' => 'parents']);
            // Ensure $role is an object
            if (!is_object($role)) {
                throw new \Exception('Failed to create or retrieve the role.');
            }

            $user = User::create([
                'first_name' => $request->first_name,
                'last_name' => $request->last_name,
                'email' => $request->email,
                'role_id' => $role->id,
                'curriculum_id' => $request->curriculum_id,
            ]);

            // Store children data
            if ($request->number_of_kids > 0 && !empty($request->children_emails)) {
                foreach ($request->children_emails as $childEmail) {
                    Child::create([
                        'parent_id' => $user->id,
                        'email' => $childEmail,
                    ]);
                }
            }

            // Send confirmation email
            Mail::to($user->email)->send(new RegistrationConfirmation($user));

            return response()->json(['message' => 'Registration successful, please check your email for confirmation.']);
        } catch (\Exception $e) {
            Log::error('Registration failed: ' . $e->getMessage());
            return response()->json(['error' => 'Registration failed.'], 500);
        }
    }

    public function registerTutor(Request $request)
    {
        $request->validate([
            'first_name' => 'required|string|max:255',
            'last_name' => 'required|string|max:255',
            'email' => 'required|string|email|max:255|unique:users',
            'curriculum_id' => 'required|exists:curriculums,id',
            'class_type' => 'required|string|in:one_to_one,group,both',
            'rate_per_hour' => 'required|numeric|min:0',
            'max_students' => 'required|numeric|min:0',
            'qualifications' => 'required|array',
            'qualifications.*' => 'file|mimes:pdf,doc,docx|max:2048'
        ]);

        try {
            $role = Role::firstOrCreate(['role_name' => 'tutor']);
             // Ensure $role is an object
            if (!is_object($role)) {
                throw new \Exception('Failed to create or retrieve the role.');
            }
            $user = User::create([
                'first_name' => $request->first_name,
                'last_name' => $request->last_name,
                'email' => $request->email,
                'role_id' => $role->id,
                'curriculum_id' => $request->curriculum_id,
                'class_type' => $request->class_type,
                'rate_per_hour' => $request->rate_per_hour,
                'max_students' => $request->max_students,
            ]);

            // Handle file uploads for qualifications
            foreach ($request->file('qualifications') as $file) {
                $path = $file->store('qualifications', 'public');
                // You can store file paths in the database or process them as needed
                // Example: TutorQualification::create(['user_id' => $user->id, 'file_path' => $path]);
            }

            // Send confirmation email
            Mail::to($user->email)->send(new RegistrationConfirmation($user));

            return response()->json(['message' => 'Registration successful, please check your email for confirmation.']);
        } catch (\Exception $e) {
            Log::error('Registration failed: ' . $e->getMessage());
            return response()->json(['error' => 'Registration failed.'], 500);
        }
    }

    // Helper method to get role ID based on role name
    private function roleIdFor($roleName)
    {
        $role = Role::where('role_name', $roleName)->firstOrFail()->id;
        if (!$role) {
            Log::error("Role '{$roleName}' not found.");
            throw new \Exception("Role '{$roleName}' not found.");
        }
        return $role->id;
    }
}
