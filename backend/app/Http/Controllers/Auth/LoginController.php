<?php
namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Controller;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Mail;
use Illuminate\Support\Facades\URL;
use Illuminate\Support\Str;
use App\Mail\LoginConfirmation;
use Illuminate\Support\Facades\Log;

class LoginController extends Controller
{
    public function login(Request $request)
    {
        $request->validate([
            'email' => 'required|email'
        ]);

        $user = User::where('email', $request->email)->first();

        if ($user) {
            // Ensure the user's email is verified
            if (!$user->hasVerifiedEmail()) {
                return response()->json(['message' => 'Email not verified. Please check your email for verification.'], 401);
            }

            // Generate a unique token for login verification
            $token = Str::random(60);
            $hashedToken = hash('sha256', $token);
            $user->update(['login_token' => $hashedToken]);

            // Send confirmation email with the link to the respective homepage
            Mail::to($user->email)->send(new LoginConfirmation($user));

            return response()->json(['message' => 'Login successful, please check your email for confirmation.']);
        }

        return response()->json(['message' => 'Invalid email address'], 401);
    }

    public function confirmLogin($token)
    {
        Log::info('Received token for confirmation:', ['token' => $token]);

        $hashedToken = hash('sha256', $token);
        $user = User::where('login_token', $hashedToken)->first();

        if (!$user) {
            // Try finding the user with a plain token if hashing wasn't used during storage
            $user = User::where('login_token', $token)->first();
        }


        if ($user) {
            Auth::login($user);
            $user->update(['login_token' => null]); // Clear the token after use
            Log::info('User logged in successfully:', ['user_id' => $user->id]);
            $homeUrl = $this->determineHomeUrl($user);
            return redirect()->away($homeUrl);
        }
        Log::warning('Invalid or expired token provided:', ['token' => $token]);

        return response()->json(['error' => 'Invalid or expired token'], 400);
    }
 private function determineHomeUrl($user)
    {
        $frontendBaseUrl = env('FRONTEND_URL','http://localhost:3000');
        $roleHomeUrls = [
            1 => '/homeschooler',
        ];

        return $frontendBaseUrl . ($roleHomeUrls[$user->role->id] ?? '/');
    }
}
