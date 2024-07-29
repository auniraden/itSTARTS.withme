<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\VerificationController;
use App\Http\Controllers\AdminController;
use App\Http\Controllers\HomeController;


Route::get('/', function () {
    return view('welcome');
});

// Apply web middleware to CSRF token endpoint
Route::middleware(['web'])->group(function () {
    Route::get('/csrf-token', function () {
        return response()->json(['token' => csrf_token()]);
    });
});

    Route::get('/test-registration', function () {
        return view('test_registration');
    });




Route::prefix('admin')->group(function () {
    Route::get('/login', [AdminController::class, 'showLoginForm'])->name('admin.login.form');
    Route::post('/login', [AdminController::class, 'login'])->name('admin.login');
    Route::post('/logout', [AdminController::class, 'logout'])->name('admin.logout');

    Route::middleware('auth:admin')->group(function () {
        Route::get('/dashboard', [AdminController::class, 'dashboard'])->name('admin.dashboard');
        Route::get('/tutors', [AdminController::class, 'tutorList'])->name('admin.tutors');
        Route::get('/tutor/{id}', [AdminController::class, 'tutorDetails'])->name('admin.tutor.details');
        Route::post('/tutor/{id}/approve', [AdminController::class, 'approveTutor'])->name('admin.tutor.approve');
        Route::post('/tutor/{id}/disapprove', [AdminController::class, 'disapproveTutor'])->name('admin.tutor.disapprove');
    });
});
