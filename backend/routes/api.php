<?php
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\HomeschoolerSignUpController;
use App\Http\Controllers\ParentSignUpController;
use App\Http\Controllers\TutorSignUpController;
use App\Http\Controllers\RoleSelectionController;
use App\Http\Controllers\ResourceController;



Route::get('/user', function (Request $request) {
    return $request->user();
})->middleware('auth:sanctum');

// // Homeschooler Sign Up
// Route::post('/homeschooler/register', [HomeschoolerSignUpController::class, 'register']);

// // Parent Sign Up
// Route::post('/parent/register', [ParentSignUpController::class, 'register']);

// // Tutor Sign Up
// Route::post('/tutor/register', [TutorSignUpController::class, 'register']);


// Route::post('/select-role', [RoleSelectionController::class, 'selectRole']);

//Add more routes as needed for your application
Route::middleware('auth:api')->get('/tasks', 'ClassroomController@tasks');

Route::middleware('auth:sanctum')->group(function () {
    Route::get('/resources', [ResourceController::class, 'index']);
    Route::post('/resources', [ResourceController::class, 'store']);
});
