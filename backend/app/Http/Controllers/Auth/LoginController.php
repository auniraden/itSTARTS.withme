<?php
namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Controller;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Mail;
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
                Log::warning('User email not verified:', ['user_id' => $user->id]);
                return response()->json(['message' => 'Email not verified. Please check your email for verification.'], 401);
            }

            // // Generate a Sanctum token
            // $token = $user->createToken('login-token')->plainTextToken;

            //Generate unique token
            $token = Str::random(60);
            $hashedToken = hash('sha256', $token);
            $user->update(['login_token' => $hashedToken]);

            // Send confirmation email with the link to the respective homepage
            Mail::to($user->email)->send(new LoginConfirmation($user));

            Log::info('Login email sent to user:', ['user_id' => $user->id]);
            return response()->json(['message' => 'Login successful, please check your email for confirmation.']);
        }

        Log::warning('Invalid email address:', ['email' => $request->email]);
        return response()->json(['message' => 'Invalid email address'], 401);
    }

    public function confirmLogin($token)
    {
        Log::info('Received token for confirmation:', ['token' => $token]);

        // //Use the token to find the user
        // $user = User::where('email', decrypt($token))->first();

        $hashedToken = hash('sha256', $token);
        $user = User::where('login_token', $hashedToken)->first();

        if (!$user) {
            // Try finding the user with a plain token if hashing wasn't used during storage
            $user = User::where('login_token', $token)->first();
        }

        if ($user) {
            Auth::login($user);
            // Generate a Sanctum token
            $sanctumToken = $user->createToken('authToken')->plainTextToken;

            // $user->update(['login_token' => null]); // Clear the token after use
            Log::info('User logged in successfully:', ['user_id' => $user->id]);


            $homeUrl = $this->determineHomeUrl($user, $sanctumToken);
            return redirect()->away($homeUrl);
        }

        Log::warning('Invalid or expired token provided:', ['token' => $token]);
        return response()->json(['error' => 'Invalid or expired token'], 400);
    }

    private function determineHomeUrl($user, $sanctumToken)
    {
        $frontendBaseUrl = env('FRONTEND_URLS', 'http://localhost:3000');
        $roleHomeUrls = [
            1 => '/homeschooler',
        ];

        return $frontendBaseUrl . ($roleHomeUrls[$user->role->id] ?? '/'). '?token=' . $sanctumToken;
    }
}
