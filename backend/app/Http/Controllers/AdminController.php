<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\User;
use App\Mail\TutorApproved;
use App\Mail\TutorDisapproved;
use Illuminate\Support\Facades\Mail;
use Illuminate\Support\Facades\Auth;

class AdminController extends Controller
{
     // Show admin login form
     public function showLoginForm()
     {
         return view('admin.login');
     }


     // Handle admin login
     public function login(Request $request)
     {
         // Validate the incoming request
         $request->validate([
            'email' => 'required|email',
            'password' => 'required',
        ]);

        // Retrieve only the email and password from the request
        $credentials = $request->only('email', 'password');

        // Attempt to authenticate the user with the given credentials
        if (Auth::guard('admin')->attempt($credentials))  {
            // Authentication successful, redirect to the admin dashboard
            return redirect()->route('admin.dashboard');
        }

        // If authentication fails, redirect back to the login form with an error message
        return redirect()->route('admin.login.form')->with('error', 'Invalid credentials.');
    }
        // Admin dashboard
    public function dashboard()
    {
        return view('admin.dashboard');
    }

    // Logout
    public function logout()
    {
        Auth::logout();
        return redirect()->route('admin.login.form');
    }

    public function tutorList()
    {
        $tutors = User::where('role_id', 3)->where('is_approved', false)->get();
        return view('admin.tutor-list', compact('tutors'));
    }

    public function tutorDetails($id)
    {
        $tutor = User::findOrFail($id);
        return view('admin.tutor-details', compact('tutor'));
    }

    public function approveTutor(Request $request, $id)
    {
        $tutor = User::findOrFail($id);
        $tutor->is_approved = true;
        $tutor->save();

        Mail::to($tutor->email)->send(new TutorApproved($tutor));

        return redirect()->route('admin.tutors')->with('success', 'Tutor approved successfully');
    }

    public function disapproveTutor(Request $request, $id)
    {
        $tutor = User::findOrFail($id);
        $reasons = [];
        if (!$request->has('subject_approved')) {
            $reasons[] = 'Subjects not approved';
        }
        if (!$request->has('qualification_approved')) {
            $reasons[] = 'Qualifications not approved';
        }

        Mail::to($tutor->email)->send(new TutorDisapproved($tutor, $reasons));

        return redirect()->route('admin.tutors')->with('success', 'Tutor disapproved and notified');
    }
}
