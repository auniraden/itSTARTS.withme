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
use Illuminate\Support\Str;

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
            $token = Str::random(60);

            $user = User::create([
                'first_name' => $request->first_name,
                'last_name' => $request->last_name,
                'email' => $request->email,
                'role_id' => $role->id,
                'curriculum_id' => $request->curriculum_id,
                'email_verification_token' => $token,
            ]);

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
