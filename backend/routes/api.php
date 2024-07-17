<?php
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\HomeschoolerSignUpController;
use App\Http\Controllers\ParentSignUpController;
use App\Http\Controllers\TutorSignUpController;
use App\Http\Controllers\RoleSelectionController;


// Homeschooler Sign Up
Route::post('/homeschooler/register', [HomeschoolerSignUpController::class, 'register']);

// Parent Sign Up
Route::post('/parent/register', [ParentSignUpController::class, 'register']);

// Tutor Sign Up
Route::post('/tutor/register', [TutorSignUpController::class, 'register']);


Route::post('/select-role', [RoleSelectionController::class, 'selectRole']);

// Add more routes as needed for your application

?>
