<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Role;
use App\Models\User;

class RoleSelectionController extends Controller
{
    public function selectRole(Request $request)
    {
        $request->validate([
            'role' => 'required|string|in:homeschooler,parents,tutor',
        ]);

        $roleName = $request->input('role');

        // Check if role exists or create a new one
        $role = Role::firstOrCreate(['role_name' => $roleName]);

        // Assuming user is authenticated and available via auth() helper
        $user = $request->user(); // or use $request->user() if using Laravel's built-in auth
        $user->role_id = $role->id;
        $user->save();

        $redirectRoute = '';

        switch ($roleName) {
            case 'homeschooler':
                $redirectRoute = '/sign-up-homeschooler';
                break;
            case 'parents':
                $redirectRoute = '/sign-up-parents';
                break;
            case 'tutor':
                $redirectRoute = '/sign-up-tutor';
                break;
        }

        return response()->json(['redirect' => $redirectRoute]);
    }
}
