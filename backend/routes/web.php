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

    // Homeschooler Sign Up
    Route::post('/homeschooler/register', [HomeschoolerSignUpController::class, 'register']);

    // Parent Sign Up
    Route::post('/parent/register', [ParentSignUpController::class, 'register']);

    // Tutor Sign Up
    Route::post('/tutor/register', [TutorSignUpController::class, 'register']);

    Route::post('/select-role', [RoleSelectionController::class, 'selectRole']);

    Route::get('/test-email', function () {
        Mail::to('test@example.com')->send(new TestMail());
        return 'Test email sent!';
    });
});
