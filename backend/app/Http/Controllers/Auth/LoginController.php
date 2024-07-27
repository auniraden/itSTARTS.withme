<?php

namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Controller;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Mail;
use Illuminate\Support\Str;
use App\Mail\LoginConfirmation;


class LoginController extends Controller
{
    public function login(Request $request)
    {
        $request->validate([
            'email' => 'required|email'
        ]);

        $user = User::where('email', $request->email)->first();

        if ($user) {
            // Generate a unique token for email verification
            $token = Str::random(60);
            $user->update(['login_token' => $token]);

            // Send confirmation email with the link to the respective homepage
            Mail::to($user->email)->send(new LoginConfirmation($user));

            return response()->json(['message' => 'Login successful, please check your email for confirmation.']);
        }

        return response()->json(['message' => 'Invalid email address'], 401);
    }

    public function confirmLogin($token)
    {
        $user = User::where('login_token', $token)->first();

        if ($user) {
            Auth::login($user);
            $user->update(['login_token' => null]); // Clear the token after use
            $homeUrl = $this->determineHomeUrl($user);
            // return response()->json(['redirect' => $homeUrl], 200);
            return redirect()->away($homeUrl);
        }

        return response()->json(['error' => 'Invalid or expired token'], 400);
    }

    private function determineHomeUrl($user)
    {
        $frontendBaseUrl = 'http://127.0.0.1:3000';
        $roleHomeUrls = [
                1 => '/homeschooler',
                2 => '/parents-home',
                3 => '/tutor-home',
        ];

        return $frontendBaseUrl . ($roleHomeUrls[$user->role->name] ?? '/');
    }
}
