<?php

namespace App\Http\Controllers;

use App\Models\Role;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Log;

class RoleSelectionController extends Controller
{
    public function selectRole(Request $request)
    {
        $role = $request->input('role');

        // Ensure the role exists or create it if not
        $roleModel = Role::firstOrCreate(['role_name' => $role]);

        // Define the redirection URL based on the role
        $redirectUrls = [
            'homeschooler' => '/sign-up-homeschooler',
        ];

        $redirectUrl = $redirectUrls[$role] ?? null;

        if ($redirectUrl) {
            return response()->json(['redirect' => $redirectUrl]);
        } else {
            Log::error("Invalid role selected: {$role}");
            return response()->json(['error' => 'Invalid role selected'], 400);
        }
    }
}
