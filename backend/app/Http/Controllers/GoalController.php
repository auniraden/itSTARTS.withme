<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Goal;
class GoalController extends Controller
{
    public function store(Request $request)
    {
        $request->validate([
            'goals' => 'required|array|max:3',
            'goals.*' => 'string|max:255',
        ]);

        $user = $request->user();

        // Clear any previous goals for the user for today
        Goal::where('student_id', $user->id)->delete();

        // Store new goals
        foreach ($request->goals as $goalName) {
            Goal::create([
                'student_id' => $user->id,
                'goal_name' => $goalName,
                'progress' => 0,
            ]);
        }

        return response()->json(['message' => 'Goals saved successfully!', 'goals' => $request->goals]);
    }

    public function getUserGoals(Request $request)
    {
        $user = $request->user();
        $goals = Goal::where('student_id', $user->id)->get();
        return response()->json(['goals' => $goals]);
    }

    public function updateProgress(Request $request)
{
    $user = $request->user();

    foreach ($request->goals as $goalData) {
        $goal = Goal::find($goalData['id']);
        if ($goal && $goal->student_id == $user->id) {
            $goal->progress = $goalData['progress'];
            $goal->save();
        }
    }

    $updatedGoals = Goal::where('student_id', $user->id)->get();
    return response()->json(['goals' => $updatedGoals]);
}
}
