<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class CurriculumController extends Controller
{
    public function getUserCurriculum(Request $request)
    {
        // Ensure user is authenticated
        if (!$user = Auth::user()) {
            return response()->json(['message' => 'User not authenticated'], 401);
        }

        $curriculumId = $user->curriculum_id;

        // Ensure curriculum ID is set
        if (!$curriculumId) {
            return response()->json(['message' => 'No curriculum assigned'], 404);
        }

        $curriculum = \App\Models\Curriculum::find($curriculumId);

        // Ensure curriculum exists
        if (!$curriculum) {
            return response()->json(['message' => 'Curriculum not found'], 404);
        }

        return response()->json($curriculum);
    }
}
