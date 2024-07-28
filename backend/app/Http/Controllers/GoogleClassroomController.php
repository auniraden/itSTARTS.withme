<?php

namespace App\Http\Controllers;

use App\Models\ClassModel;
use App\Models\Schedule;
use App\Models\User;
use Google\Service\Calendar;
use Google_Client;
use Google\Service\Classroom;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;


class GoogleClassroomController extends Controller
{
    private $client;

    public function __construct()
    {
        $this->client = new Google_Client();
        $this->client->setAuthConfig(storage_path('app/google-credentials.json'));
        $this->client->addScope([
            Classroom::CLASSROOM_COURSES_READONLY,
            Calendar::CALENDAR_READONLY,
        ]);
        $this->client->setAccessType('offline');
    }

    public function getClasses(Request $request)
    {
        try {
            $user = User::find(Auth::id());
            if (!$user) {
                return response()->json(['error' => 'User not authenticated'], 401);
            }

            $accessToken = $user->google_access_token;
            $refreshToken = $user->google_refresh_token;

            if (!$accessToken) {
                return response()->json(['error' => 'Google Classroom not connected'], 401);
            }

            $this->client->setAccessToken($accessToken);

            if ($this->client->isAccessTokenExpired()) {
                if ($refreshToken) {
                    $this->refreshToken($refreshToken, $user);
                } else {
                    return response()->json(['error' => 'Authentication required'], 401);
                }
            }

            $service = new Classroom($this->client);
            $optParams = ['courseStates' => 'ACTIVE'];
            $results = $service->courses->listCourses($optParams);

            $classes = [];
            foreach ($results->getCourses() as $course) {
                $classModel = ClassModel::updateOrCreate(
                    ['code' => $course->getEnrollmentCode()],
                    [
                        'name' => $course->getName(),
                        'tutor_id' => $user->id,
                        'curriculum_id' => $user->curriculum_id,
                    ]
                );

                $classes[] = [
                    'id' => $classModel->id,
                    'name' => $classModel->name,
                    'code' => $classModel->code,
                    'link' => $course->getAlternateLink(),
                    'tutorName' => $user->first_name . ' ' . $user->last_name,
                ];
            }

            return response()->json($classes);
        } catch (\Exception $e) {
            return response()->json(['error' => $e->getMessage()], 500);
        }
    }

    public function auth(Request $request)
    {
        $authUrl = $this->client->createAuthUrl();
        return redirect($authUrl);
    }

    public function callback(Request $request)
    {
        $token = $this->client->fetchAccessTokenWithAuthCode($request->get('code'));

        $user = Auth::user();
        if (!$user) {
            return redirect('http://localhost:3000/login')->with('error', 'User not authenticated');
        }

        $user->google_access_token = $token['access_token'];
        $user->google_refresh_token = $token['refresh_token'] ?? null;
        if ($user instanceof User) {
            $user->save();
        } else {
            return response()->json(['error' => 'Invalid user'], 500);
        }

        return redirect('http://localhost:3000/homeschooler');
    }

    private function refreshToken($refreshToken, User $user)
    {
        $this->client->fetchAccessTokenWithRefreshToken($refreshToken);
        $newToken = $this->client->getAccessToken();

        // Save new access token and refresh token
        $user->google_access_token = $newToken['access_token'];
        $user->google_refresh_token = $newToken['refresh_token'] ?? $refreshToken;
        $user->save();
    }

    public function getCalendarEvents(Request $request)
    {
        try {
            $user = Auth::user();
            if (!$user) {
                return response()->json(['error' => 'User not authenticated'], 401);
            }

            $accessToken = $user->google_access_token;
            $refreshToken = $user->google_refresh_token;

            if (!$accessToken) {
                return response()->json(['error' => 'Google Calendar not connected'], 401);
            }

            $this->client->setAccessToken($accessToken);

            if ($this->client->isAccessTokenExpired()) {
                if ($refreshToken) {
                    $this->refreshToken($refreshToken, $user);
                } else {
                    return response()->json(['error' => 'Authentication required'], 401);
                }
            }

            $calendarService = new Calendar($this->client);
            $calendarId = 'primary'; // or use specific calendar ID if needed
            $results = $calendarService->events->listEvents($calendarId, [
                'maxResults' => 10,
                'orderBy' => 'startTime',
                'singleEvents' => true,
                'timeMin' => date('c'), // Only upcoming events
            ]);

            $events = [];
            foreach ($results->getItems() as $event) {
                $events[] = [
                    'summary' => $event->getSummary(),
                    'start' => $event->getStart()->getDateTime() ?: $event->getStart()->getDate(),
                    'end' => $event->getEnd()->getDateTime() ?: $event->getEnd()->getDate(),
                    'description' => $event->getDescription(),
                    'link' => $event->getHtmlLink(),

                ];
            }

            return response()->json($events);
        } catch (\Exception $e) {
            return response()->json(['error' => $e->getMessage()], 500);
        }
    }
}
