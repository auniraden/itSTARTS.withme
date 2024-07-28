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
use App\Http\Controllers\GoogleClassroomController;
use App\Http\Controllers\GoogleSignInController;

//for registration
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

//for verification
Route::get('/email/verify/{id}/{token}', [VerificationController::class, 'verify'])
    ->name('verification.verify');


//for login
Route::get('/login/confirm/{token}', [LoginController::class, 'confirm'])->name('login.confirm');
Route::post('/login', [LoginController::class, 'login']);




//sacntum
Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
    return $request->user();
});

//Google APIs
Route::get('/student/classes', [GoogleClassroomController::class, 'getClasses']);
Route::get('/auth/google', [GoogleClassroomController::class, 'auth']);
Route::get('/auth/google/callback', [GoogleClassroomController::class, 'callback']);
Route::get('/calendar/events', [GoogleClassroomController::class, 'getCalendarEvents']);
Route::get('/auth/google/url', [GoogleSignInController::class, 'getAuthUrl']);
Route::post('/auth/google/callback', [GoogleSignInController::class, 'handleCallback']);
Route::get('/auth/google/status', [GoogleSignInController::class, 'checkStatus']);
