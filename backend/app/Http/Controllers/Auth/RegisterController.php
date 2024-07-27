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
use App\Models\Subject;
use App\Models\TutorSubject;

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
        $validated = $request->validate([
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

             // Create children records
        foreach ($validated['children_emails'] as $childEmail) {
            Child::create([
                'parent_id' => $user->id,
                'email' => $childEmail,
            ]);
        }

            // Send confirmation email
            Mail::to($user->email)->send(new RegistrationConfirmation($user));

            return response()->json(['message' => 'Registration successful, please check your email for confirmation.']);
        } catch (\Exception $e) {
            Log::error('Registration failed: ' . $e->getMessage(), [
                'stack' => $e->getTraceAsString(),
                'request_data' => $request->all(),
            ]);
            return response()->json(['error' => 'Registration failed. Please try again or contact support.'], 500);
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
            'subjects' => 'required|string',
            'qualifications' => 'required|array',
            'qualifications.*' => 'file|mimes:pdf,doc,docx|max:2048'
        ]);

        // Add conditional validation for max_students
        $validationRules['max_students'] = [
            'required_if:class_type,group,both',
            'numeric',
            'min:1'
        ];
        $request->validate($validationRules);

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
                'is_approved' => false, // Initial approval status set to false

            ]);

            // Add subjects for the tutor
            $subjects = explode(',', $request->subjects);
            foreach ($subjects as $subjectName) {
                $subject = Subject::firstOrCreate(['name' => trim($subjectName)]);
                TutorSubject::create([
                    'tutor_id' => $user->id,
                    'subject_id' => $subject->id,
            ]);
        }


            // Only add max_students to userData if it's provided
            if ($request->has('max_students')) {
                $user['max_students'] = $request->max_students;
            }

            //$user = User::create($userData);


            // Handle file uploads for qualifications
            foreach ($request->file('qualifications') as $file) {
                $path = $file->store('qualifications', 'public');
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
