<?php

namespace App\Services;

use Google_Client;
use Google_Service_Classroom;

class GoogleClassroomService
{
    private $client;

    public function __construct()
    {
        $this->client = new Google_Client();
        $this->client->setClientId(env('GOOGLE_CLIENT_ID'));
        $this->client->setClientSecret(env('GOOGLE_CLIENT_SECRET'));
        $this->client->setRedirectUri(env('GOOGLE_REDIRECT_URI'));
        $this->client->addScope(Google_Service_Classroom::CLASSROOM_COURSES_READONLY);
        $this->client->addScope(Google_Service_Classroom::CLASSROOM_COURSEWORK_ME_READONLY);
    }

    public function authenticate($code)
    {
        $this->client->fetchAccessTokenWithAuthCode($code);
        $token = $this->client->getAccessToken();
        session(['google_access_token' => $token]);
    }

    public function getTasks()
    {
        $this->client->setAccessToken(session('google_access_token'));
        $service = new Google_Service_Classroom($this->client);

        $courseWork = $service->courses_courseWork->listCoursesCourseWork('courseId', [
            'orderBy' => 'dueDate asc'
        ]);

        return $courseWork->getCourseWork();
    }
}
