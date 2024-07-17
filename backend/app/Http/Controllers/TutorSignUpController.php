<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Validator;

class TutorSignUpController extends Controller
{
    public function register(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'first_name' => 'required|string|max:255',
            'last_name' => 'required|string|max:255',
            'email' => 'required|string|email|max:255|unique:users',
            'curriculum_id' => 'required|exists:curriculums,id',
            'qualifications' => 'required|file|mimes:pdf,doc,docx|max:2048', // Example validation for file upload
        ]);

        if ($validator->fails()) {
            return response()->json([
                'success' => false,
                'errors' => $validator->errors(),
            ], 422);
        }

        $user = User::create([
            'name' => $request->first_name . ' ' . $request->last_name,
            'email' => $request->email,
            'role_id' => 3, // Assuming 3 is the role_id for tutors
            'curriculum_id' => $request->curriculum_id,
            'password' => Hash::make('password'), // Temporary password for email verification
        ]);

        // Handle the file upload
        if ($request->hasFile('qualifications')) {
            $file = $request->file('qualifications');
            $path = $file->store('qualifications', 'public');
            // Save the path or handle it as needed
        }

        $user->sendEmailVerificationNotification();

        return response()->json([
            'success' => true,
            'message' => 'You have registered successfully! Please check your email for verification link.',
        ], 201);
    }
}
