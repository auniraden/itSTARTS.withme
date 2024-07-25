<?php
namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\User;
use Illuminate\Support\Facades\URL;
use Illuminate\Support\Facades\Auth;

class VerificationController extends Controller
{
    public function verify(Request $request, $id, $token)
    {
        if (! $request->hasValidSignature()) {
            abort(401); // Unauthorized
        }

        $user = User::findOrFail($id);

        if ($user->hasVerifiedEmail()) {
            return redirect('/')->with('message', 'Email already verified.');
        }

        $user->markEmailAsVerified();

        Auth::login($user); // Log the user in

        // Determine the user's role and redirect to the appropriate homepage
        $role = $user->role_id;
        $redirectUrls = [
            1 => '/homeschooler',
            2 => '/parents-home',
            3 => '/tutor-home',
        ];

        $redirectUrl = $redirectUrls[$role] ?? '/'; // Default to home if role not found

        return redirect($redirectUrl)->with('message', 'Email verified and logged in.');
    }
}
