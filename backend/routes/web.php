<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\VerificationController;

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
