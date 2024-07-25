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

Route::middleware([
    EnsureFrontendRequestsAreStateful::class,
    ThrottleRequests::class,
    SubstituteBindings::class,
    ])->group(function () {
        Route::post('/register/homeschooler', [RegisterController::class, 'registerHomeschooler']);
        Route::post('/register/parent', [RegisterController::class, 'registerParent']);
        Route::post('/register/tutor', [RegisterController::class, 'registerTutor']);
        Route::post('/select-role', [RoleSelectionController::class, 'selectRole']);
});

Route::get('/email/verify/{id}/{token}', [VerificationController::class, 'verify'])
    ->name('verification.verify');



Route::post('/login', [LoginController::class, 'login']);
Route::get('/login/confirm/{token}', [LoginController::class, 'confirmLogin'])->name('login.confirm');



Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
    return $request->user();
});
