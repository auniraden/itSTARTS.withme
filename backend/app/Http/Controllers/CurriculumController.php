<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class CurriculumController extends Controller
{
    public function getUserCurriculum()
    {
        $user = Auth::user();
        $curriculum = $user->curriculum;
        return response()->json($curriculum);
    }
}
