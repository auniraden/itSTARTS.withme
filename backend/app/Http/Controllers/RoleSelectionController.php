<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

class RoleSelectionController extends Controller
{
    public function selectRole(Request $request)
    {
        $validatedData = $request->validate([
            'role' => 'required|string|in:homeschooler,parents,tutors',
        ]);

        // Determine where to redirect based on selected role
        switch ($validatedData['role']) {
            case 'homeschooler':
                return redirect('/sign-up-homeschooler-page');
                break;
            case 'parents':
                return redirect('/sign-up-parents-page');
                break;
            case 'tutors':
                return redirect('/sign-up-tutor-page');
                break;
            default:
                return response()->json(['error' => 'Invalid role selected'], 400);
        }
    }
}
