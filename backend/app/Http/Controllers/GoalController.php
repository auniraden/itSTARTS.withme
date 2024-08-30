<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use App\Models\Goal;

class GoalController extends Controller
{
    public function store(Request $request)
    {
        $goals = $request->input('goals');
        $validGoals = array_filter($goals, fn($goal) => !empty(trim($goal)));

        if (count($validGoals) > 3) {
            return response()->json(['message' => 'Only 3 goals can be made for today!'], 422);
        }

        // Ensure email is attached to the goals
        $email = $request->input('email'); // Assuming email is being sent in the request


        // Store new goals
        foreach ($validGoals as $goal) {
            Goal::create([
                'goal_name' => $goal,
                'email' => $request->user()->email, // Set the email
            ]);

        }

        return response()->json(['message' => 'Goals saved successfully!']);
    }

    // Method to fetch goals for the authenticated user
    public function getUserGoals(Request $request)
    {
        $email = $request->user()->email;
        $goals = Goal::where('email', $email)->get();

        return response()->json($goals);
    }

    //Method to delete goals that done.
    public function deleteGoal(Request $request, $id)
{
    $goal = Goal::where('email', $request->user()->email)->where('id', $id)->first();

    if ($goal) {
        $goal->delete();
        return response()->json(['message' => 'Goal deleted successfully!']);
    } else {
        return response()->json(['message' => 'Goal not found!'], 404);
    }
}

}
