<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Session;

class RoleSelectionController extends Controller
{
    public function selectRole(Request $request)
    {
        // Validate the role input
        $validatedData = $request->validate([
            'role' => 'required|string|in:homeschooler,parents,tutors',
        ]);

        // Store the selected role in the session
        Session::put('selected_role', $validatedData['role']);

        // Determine where to redirect based on the selected role
        switch ($validatedData['role']) {
            case 'homeschooler':
                return redirect('/sign-up-homeschooler-page');
                break;
            case 'parents':
                return redirect('/sign-up-parents-page');
                break;
            case 'tutor':
                return redirect('/sign-up-tutor-page');
                break;
            default:
                return response()->json(['error' => 'Invalid role selected'], 400);
        }
    }
}
