<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Log;

class CurriculumController extends Controller
{
    public function getUserCurriculum(Request $request)
    {
        Log::info('Authenticated user:', ['user' => Auth::user()]);

        if (Auth::check()) {
            $curriculum = Auth::user()->curriculums; // Ensure this is the correct relationship
            return response()->json(['curriculum' => $curriculum]);
        } else {
            return response()->json(['message' => 'Unauthorized'], 401);
        }
    }
}
