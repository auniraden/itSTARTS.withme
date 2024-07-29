<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Goal;
class GoalController extends Controller
{
    public function store(Request $request)
    {
        $request->validate([
            'goals' => 'required|array|size:3',
            'goals.*' => 'required|string|max:255',
        ]);

        $user = $request->user();

        // Delete existing goals for the user
        Goal::where('student_id', $user->id)->delete();

        // Create new goals
        foreach ($request->goals as $goalName) {
            Goal::create([
                'student_id' => $user->id,
                'goal_name' => $goalName,
                'progress' => 0,
            ]);
        }

        return response()->json(['message' => 'Goals saved successfully'], 201);
    }
}
