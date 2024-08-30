<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Log;
use App\Models\User;

class CurriculumController extends Controller
{
    public function getUserCurriculum(Request $request)
    {
        $user = User::with('curriculum')
            ->where('id', $request->user()->id)
            ->first();

        return response()->json([
            'curriculum_name' => $user->curriculum->curriculum_name,
            'link' => $user->curriculum->link,
        ]);
    }
}
