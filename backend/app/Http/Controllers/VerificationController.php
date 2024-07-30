<?php
namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\User;
use Illuminate\Support\Facades\URL;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Log;

class VerificationController extends Controller
{
    public function verify(Request $request, $id, $token)
    {
        if (! $request->hasValidSignature()) {
            Log::error('Invalid verification signature.', ['id' => $id, 'token' => $token]);
            abort(401); // Unauthorized
        }

        $user = User::findOrFail($id);

        if ($user->hasVerifiedEmail()) {
            return redirect('/')->with('message', 'Email already verified.');
        }

         // Verify the token
        if (sha1($user->email) !== $token) {
            Log::error('Token mismatch.', ['id' => $id, 'token' => $token]);
            abort(401); // Unauthorized
        }

        $user->markEmailAsVerified();

        Auth::login($user); // Log the user in



        // Check if the user is a tutor and if they are approved
        if ($user->role_id === 3 && !$user->is_approved) {
            Auth::logout();
            return view('auth.pending-approval'); // Show pending approval page
        }

        // Determine the user's role and redirect to the appropriate homepage
        $role = $user->role_id;
        $frontendBaseUrl = env('FRONTEND_BASE_URL', 'http://127.0.0.1:3000');
        $redirectUrls = [
            1 => '/homeschooler',
        ];

        $redirectUrl = $frontendBaseUrl . ($redirectUrls[$role] ?? '/');
        return redirect()->away($redirectUrl);
    }
}
