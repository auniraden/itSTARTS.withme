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
use Illuminate\Support\Facades\Log;
use App\Http\Controllers\UserController;

// Registration routes
// Route::middleware([
//     EnsureFrontendRequestsAreStateful::class,
//     ThrottleRequests::class,
//     SubstituteBindings::class,
// ])->group(function () {
//     Route::post('/register/homeschooler', [RegisterController::class, 'registerHomeschooler']);
//     Route::post('/select-role', [RoleSelectionController::class, 'selectRole']);
// });

//Registration routes
Route::post('/register/homeschooler', [RegisterController::class, 'registerHomeschooler']);
Route::post('/select-role', [RoleSelectionController::class, 'selectRole']);

// Verification routes
Route::get('/email/verify/{id}/{token}', [VerificationController::class, 'verify'])
->name('verification.verify');

// // Login routes
Route::get('/login/confirm/{token}', [LoginController::class, 'confirmLogin'])->name('login.confirm');
Route::post('/login', [LoginController::class, 'login'])->name('login');


// Route::middleware('auth:sanctum')->get('/check-session', function () {
//     return response()->json(['status' => 'Session exists']);
// });

// Route::get('/user', function (Request $request) {
//     return $request->user();
// })->middleware('auth:sanctum');

Route::get('/user', [UserController::class, 'getUserData'])->middleware('auth:sanctum');

Route::post('/logout', [LogoutController::class, 'logout'])->middleware('auth:sanctum');
Route::get('/homeschooler/curriculum', [CurriculumController::class, 'getUserCurriculum'])->middleware('auth:sanctum');
Route::post('/goals', [GoalController::class, 'store'])->middleware('auth:sanctum');
Route::get('/myGoals', [GoalController::class, 'getUserGoals'])->middleware('auth:sanctum');
Route::delete('/deleteGoal/{id}', [GoalController::class, 'deleteGoal']);
Route::post('/dearmeletters', [LetterController::class, 'store'])->middleware('auth:sanctum');




// Authenticated routes
Route::middleware('auth:sanctum')->group(function () {


    // Route::get('/homeschooler/curriculum', [CurriculumController::class, 'getUserCurriculum']);
    // Route::post('/goals', [GoalController::class, 'store']);
    // Route::post('/dearmeletters', [LetterController::class, 'store']);
    // Route::post('/logout', [LogoutController::class, 'logout']);
    // Route::get('/user', function (Request $request) {
    //     return $request->user();
    // });
});
