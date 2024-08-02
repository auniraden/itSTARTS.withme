<?php

use Illuminate\Support\Facades\Route;
use Illuminate\Http\Request;
use App\Http\Controllers\Auth\RegisterController;
use App\Http\Controllers\RoleSelectionController;
use Laravel\Sanctum\Http\Middleware\EnsureFrontendRequestsAreStateful;
use Illuminate\Routing\Middleware\SubstituteBindings;
use App\Http\Controllers\VerificationController;
use App\Http\Controllers\Auth\LoginController;
use Illuminate\Routing\Middleware\ThrottleRequests;
use App\Http\Controllers\CurriculumController;
use App\Http\Controllers\GoalController;
use App\Http\Controllers\LetterController;
use App\Http\Controllers\Auth\LogoutController;

// Registration routes
Route::middleware([
    EnsureFrontendRequestsAreStateful::class,
    ThrottleRequests::class,
    SubstituteBindings::class,
])->group(function () {
    Route::post('/register/homeschooler', [RegisterController::class, 'registerHomeschooler']);
    Route::post('/select-role', [RoleSelectionController::class, 'selectRole']);
});

// Verification routes
Route::get('/email/verify/{id}/{token}', [VerificationController::class, 'verify'])
    ->name('verification.verify');

// Login routes
Route::get('/login/confirm/{token}', [LoginController::class, 'confirmLogin'])->name('login.confirm');
Route::post('/login', [LoginController::class, 'login']);

// Authenticated routes
Route::middleware('auth:sanctum')->group(function () {
    Route::get('/homeschooler/curriculum', [CurriculumController::class, 'getUserCurriculum']);
    Route::post('/goals', [GoalController::class, 'store']);
    Route::post('/dearmeletters', [LetterController::class, 'store']);
    Route::post('/logout', [LogoutController::class, 'logout']);
    Route::get('/user', function (Request $request) {
        return $request->user();
    });
});
