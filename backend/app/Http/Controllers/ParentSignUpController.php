<?php

namespace App\Http\Controllers;

use App\Models\User;
use App\Models\Child;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Validator;

class ParentSignUpController extends Controller
{
    public function register(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'first_name' => 'required|string|max:255',
            'last_name' => 'required|string|max:255',
            'email' => 'required|string|email|max:255|unique:users',
            'curriculum_id' => 'required|exists:curriculums,id',
            'children' => 'required|array',
            'children.*.email' => 'required|string|email|max:255|unique:children,email',
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
            'role_id' => 2, // Assuming 2 is the role_id for parents
            'curriculum_id' => $request->curriculum_id,
            'password' => Hash::make('password'), // Temporary password for email verification
        ]);

        foreach ($request->children as $child) {
            Child::create([
                'parent_id' => $user->id,
                'email' => $child['email'],
            ]);
        }

        $user->sendEmailVerificationNotification();

        return response()->json([
            'success' => true,
            'message' => 'You have registered successfully! Please check your email for verification link.',
        ], 201);
    }
}
