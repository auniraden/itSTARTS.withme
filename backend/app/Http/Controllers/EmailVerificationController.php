<?php

namespace App\Http\Controllers;

use App\Models\User; // Import the User class
use Illuminate\Http\Request;
use Illuminate\Auth\Events\Verified; // Import the Verified class
use Illuminate\Support\Facades\Session;
use Illuminate\Support\Facades\Auth;

class EmailVerificationController extends Controller
{

public function verifyEmail(Request $request)
{
    $user = Auth::user(); // Assuming the user is authenticated and the email is verified

    // Retrieve the role from the session
    $role = Session::get('selected_role');

    // Redirect based on the user's role
    switch ($role) {
        case 'homeschooler':
            Session::forget('selected_role');
            return redirect('/homeschooler-home');
        case 'parents':
            Session::forget('selected_role');
            return redirect('/parent-home');
        case 'tutor':
            Session::forget('selected_role');
            return redirect('/tutor-home');
        default:
            return redirect('/home');
    }
}

}
