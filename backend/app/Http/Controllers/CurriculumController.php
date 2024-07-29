<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

class CurriculumController extends Controller
{
    public function getUserCurriculum(Request $request)
    {
        $user = $request->user();
        $curriculum = $user->curriculum;

        if (!$curriculum) {
            return response()->json(['message' => 'No curriculum assigned'], 404);
        }

        return response()->json($curriculum);
    }
}
