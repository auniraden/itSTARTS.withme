<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\User;
use App\Models\Curriculum;
use Illuminate\Support\Facades\Auth;

class UserController extends Controller
{
    public function getUserData(Request $request)
    {
        $user = User::with('curriculum')
        ->where('id', $request->user()->id)
        ->first();

    return response()->json([
        'first_name' => $user->first_name,
        'last_name' => $user->last_name,
        'curriculum_name' => $user->curriculum->curriculum_name, // Accessing the related curriculum name
    ]);
    }
}
