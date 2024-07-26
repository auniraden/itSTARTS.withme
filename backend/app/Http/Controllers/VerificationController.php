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

        // Determine the user's role and redirect to the appropriate homepage
        $role = $user->role_id;
        $frontendBaseUrl = 'http://127.0.0.1:3000';
        $redirectUrls = [
            1 => '/homeschooler',
            2 => '/parents-home',
            3 => '/tutor-home',
        ];

        $redirectUrl = $frontendBaseUrl . ($redirectUrls[$role] ?? '/');
        return redirect()->away($redirectUrl);
    }
}
