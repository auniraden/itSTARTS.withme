<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use App\Models\Goal;

class GoalController extends Controller
{
    public function store(Request $request)
    {
        $user = Auth::users(); // Corrected to Auth::user()
        $goals = $request->input('goals');
        $validGoals = array_filter($goals, fn($goal) => !empty(trim($goal)));

        if (count($validGoals) > 3) {
            return response()->json(['message' => 'Only 3 goals can be made for today!'], 422);
        }

        // Assuming 'goals' relationship is set up correctly
        $user->goals()->whereDate('created_at', now()->toDateString())->delete();
        foreach ($validGoals as $goal) {
            $user->goals()->create(['goal_name' => $goal]);
        }

        return response()->json(['message' => 'Goals saved successfully!']);
    }
}
