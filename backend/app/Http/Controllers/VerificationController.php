<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\User;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Log;

class VerificationController extends Controller
{
    public function verify(Request $request, $id, $token)
    {
        try {
            if (!$request->hasValidSignature()) {
                throw new \Exception('Invalid verification signature.');
            }

            $user = User::findOrFail($id);

            if ($user->hasVerifiedEmail()) {
                return redirect($this->redirectTo($user))->with('message', 'Email already verified.');
            }

            // Verify the token
            if (sha1($user->email) !== $token) {
                throw new \Exception('Invalid verification token.');
            }

            // Mark email as verified
            $user->markEmailAsVerified();
            $user->email_verified_at = now();
            $user->save();

            // Log the user in
            Auth::login($user);
            // Clear the email verification token to prevent reuse
            $user->update(['email_verification_token' => null]);



            // Redirect to the appropriate homepage based on the user role
            return redirect($this->redirectTo($user));
        } catch (\Exception $e) {
            Log::error('Verification failed: ' . $e->getMessage());
            return redirect('/error')->with('error', 'Verification failed. Please try again.');
        }
    }

    protected function redirectTo($user)
    {


        Auth::login($user);

        $frontendBaseUrl = env('FRONTEND_URLS');
        $roleHomeUrls = [
            1 => '/homeschooler',
        ];


        $redirectUrl = $frontendBaseUrl . ($roleHomeUrls[$user->role->id] ?? '/');
        Log::info('Redirecting to: ' . $redirectUrl);

        return $redirectUrl;
    }
}
