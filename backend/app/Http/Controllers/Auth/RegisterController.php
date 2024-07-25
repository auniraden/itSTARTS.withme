<?php

namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Controller;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Mail;
use App\Mail\RegistrationConfirmation;
use App\Models\Child;

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

        $user = User::create([
            'first_name' => $request->first_name,
            'last_name' => $request->last_name,
            'email' => $request->email,
            'role_id' => $this->roleIdFor('homeschooler'),
            'curriculum_id' => $request->curriculum_id,
        ]);

        // Send confirmation email
        Mail::to($user->email)->send(new RegistrationConfirmation($user));

        return response()->json(['message' => 'Registration successful, please check your email for confirmation.']);
    }

    public function registerParent(Request $request)
    {
        $request->validate([
            'first_name' => 'required|string|max:255',
            'last_name' => 'required|string|max:255',
            'email' => 'required|string|email|max:255|unique:users',
            'curriculum_id' => 'required|exists:curriculums,id',
            'number_of_kids' => 'required|integer|min:1',
            'children_emails' => 'required_if:number_of_kids,>0|array',
            'children_emails.*' => 'email|distinct'
        ]);

        $user = User::create([
            'first_name' => $request->first_name,
            'last_name' => $request->last_name,
            'email' => $request->email,
            'role_id' => $this->roleIdFor('parent'),
            'curriculum_id' => $request->curriculum_id,
        ]);

        // Store children data and other parent-related logic here
        // Create child records
        foreach ($request->children_emails as $childEmail) {
            Child::create([
                'parent_id' => $user->id,
                'email' => $childEmail,
             ]);
         }
        // Send confirmation email
        Mail::to($user->email)->send(new RegistrationConfirmation($user));

        return response()->json(['message' => 'Registration successful, please check your email for confirmation.']);
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

        $user = User::create([
            'first_name' => $request->first_name,
            'last_name' => $request->last_name,
            'email' => $request->email,
            'role_id' => $this->roleIdFor('tutor'),
            'curriculum_id' => $request->curriculum_id,
            'class_type' => $request->class_type,
            'rate_per_hour' => $request->rate_per_hour,
            'max_students' => $request->max_students,
        ]);

        // Store tutor qualifications and other tutor-related logic here

        // Send confirmation email
        Mail::to($user->email)->send(new RegistrationConfirmation($user));

        return response()->json(['message' => 'Registration successful, please check your email for confirmation.']);
    }

    // Helper method to get role ID based on role name
    private function roleIdFor($roleName)
    {
        return \App\Models\Role::where('name', $roleName)->firstOrFail()->id;
    }
}
