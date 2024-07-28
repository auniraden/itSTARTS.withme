<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\User;
use Google_Client;
use Illuminate\Support\Facades\Auth;
use Google\Service\Oauth2;

class GoogleSignInController extends Controller
{
    private $client;

    public function __construct()
    {
        $this->client = new Google_Client();
        $this->client->setAuthConfig(storage_path('app/google-credentials.json'));
        $this->client->addScope([
            'email',
            'profile',
            'https://www.googleapis.com/auth/classroom.courses.readonly',
            'https://www.googleapis.com/auth/calendar.readonly',
        ]);
        $this->client->setAccessType('offline');
        $this->client->setPrompt('consent');
    }

    public function getAuthUrl()
    {
        return response()->json([
            'url' => $this->client->createAuthUrl()
        ]);
    }

    public function handleCallback(Request $request)
    {
        $token = $this->client->fetchAccessTokenWithAuthCode($request->code);

        if (!isset($token['access_token'])) {
            return response()->json(['error' => 'Failed to get access token'], 400);
        }

        $this->client->setAccessToken($token['access_token']);

        $google_oauth = new Oauth2($this->client);
        $google_account_info = $google_oauth->userinfo->get();

        $user = Auth::user();
        if ($user instanceof User) {
            // Store only necessary token data
            $user->google_id = $google_account_info->id;
            $user->google_access_token = $token['access_token'];
            $user->google_refresh_token = $token['refresh_token'] ?? $user->google_refresh_token;
            $user->save();

            return response()->json(['message' => 'Google account linked successfully']);
        } else {
            return response()->json(['error' => 'User not authenticated'], 401);
        }
    }

    public function checkStatus()
    {
        $user = Auth::user();
        return response()->json([
            'isSignedIn' => !empty($user->google_access_token)
        ]);
    }

    public function refreshToken()
    {
        $user = Auth::user();
        if ($user instanceof User && $user->google_refresh_token) {
            $this->client->refreshToken($user->google_refresh_token);
            $newToken = $this->client->getAccessToken();

            $user->google_access_token = $newToken['access_token'];
            if (isset($newToken['refresh_token'])) {
                $user->google_refresh_token = $newToken['refresh_token'];
            }
            $user->save();

            return response()->json(['message' => 'Token refreshed successfully']);
        } else {
            return response()->json(['error' => 'No refresh token available'], 400);
        }
    }
}
