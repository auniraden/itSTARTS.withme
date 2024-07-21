<?php

use Illuminate\Support\Facades\Route;
use App\Http\Middleware\CorsMiddleware;
use App\Http\Controllers\HomeschoolerSignUpController;
use App\Http\Controllers\ParentSignUpController;
use App\Http\Controllers\TutorSignUpController;
use App\Http\Controllers\RoleSelectionController;
use Illuminate\Support\Facades\Mail;
use App\Mail\TestMail;


Route::middleware(CorsMiddleware::class)->group(function () {
    Route::get('/', function () {
        return view('welcome');
    });

    Route::get('/email/verify', function () {
        return view('auth.verify-email');
    })->middleware('auth')->name('verification.notice');

    Route::get('/test', function () {
        return response()->json(['message' => 'API routes are working!']);
    });
    Route::middleware("auth:sanctum")->group(function(){
        // Homeschooler Sign Up
        Route::post('/homeschooler/register', [HomeschoolerSignUpController::class, 'register']);

        // Parent Sign Up
        Route::post('/parent/register', [ParentSignUpController::class, 'register']);

        // Tutor Sign Up
        Route::post('/tutor/register', [TutorSignUpController::class, 'register']);

        //select user role
        Route::post('/select-role', [RoleSelectionController::class, 'selectRole']);

    });

    Route::get('auth/google', function () {
        $client = new Google_Client();
        $client->setClientId(env('GOOGLE_CLIENT_ID'));
        $client->setClientSecret(env('GOOGLE_CLIENT_SECRET'));
        $client->setRedirectUri(env('GOOGLE_REDIRECT_URI'));
        $client->addScope(Google_Service_Classroom::CLASSROOM_COURSES_READONLY);
        $client->addScope(Google_Service_Classroom::CLASSROOM_COURSEWORK_ME_READONLY);
        $authUrl = $client->createAuthUrl();
        return redirect()->to($authUrl);
    });

    Route::get('auth/google/callback', 'ClassroomController@authenticate');
    Route::get('tasks', 'ClassroomController@tasks')->name('tasks.index');


    Route::get('/test-email', function () {
        Mail::to('test@example.com')->send(new TestMail());
        return 'Test email sent!';
    });
});
