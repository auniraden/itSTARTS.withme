<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

class RoleSelectionController extends Controller
{
    public function selectRole(Request $request)
    {
        $role = $request->input('role');

        // Define the redirection URL based on the role
        $redirectUrls = [
            'homeschooler' => '/sign-up-homeschooler',
            'parents' => '/sign-up-parents',
            'tutor' => '/sign-up-tutor',
        ];

        $redirectUrl = $redirectUrls[$role] ?? null;

        if ($redirectUrl) {
            return response()->json(['redirect' => $redirectUrl]);
        } else {
            return response()->json(['error' => 'Invalid role selected'], 400);
        }
    }
}
