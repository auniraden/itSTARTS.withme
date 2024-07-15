<?php
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\TutorsSignupController;
use App\Http\Controllers\ParentsSignupController;
use App\Http\Controllers\HomeschoolersSignupController;
use App\Http\Controllers\RoleSelectionController;

//  tutors signup
Route::post('/signup/tutors', [TutorsSignupController::class, 'signup']);

//  parents signup
Route::post('/signup/parents', [ParentsSignupController::class, 'signup']);

//  homeschoolers signup
Route::post('/signup/homeschoolers', [HomeschoolersSignupController::class, 'signup']);

Route::post('/select-role', [RoleSelectionController::class, 'selectRole']);

// Add more routes as needed for your application

?>
