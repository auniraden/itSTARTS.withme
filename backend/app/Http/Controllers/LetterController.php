<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Letter;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\Auth;


class LetterController extends Controller
{
    public function store(Request $request)
    {
        Log::info('Letter store method called');
        $validated = $request->validate([
            'content' => 'required|string',
            'delivery_date' => 'required|date',
            'email' => 'required|email',
        ]);
        // Get the authenticated user
        $user = Auth::user();

        // Ensure the user has a role of student
        if ($user->role_id != 1) {
            return response()->json(['error' => 'Unauthorized'], 403);
        }


        Letter::create([
            'student_id' => $user->id,
            'content' => $request->input('content'),
            'delivery_date' =>  $request->input('delivery_date'),
            'email' => $request->input('email'),
        ]);

        return response()->json(['message' => 'Letter scheduled successfully']);
    }
}
