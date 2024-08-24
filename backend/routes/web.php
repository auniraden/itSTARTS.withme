<?php

use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\CurriculumController;
use Illuminate\Support\Facades\Session;




Route::get('/', function () {
    return view('welcome');
});



// Apply web middleware to CSRF token endpoint
// Route::middleware(['web'])->group(function () {
//     Route::get('/csrf-token', function () {
//         return response()->json(['token' => csrf_token()]);


//     });
// });



    // Route::middleware('auth:sanctum')->get('/homeschooler/curriculum', [CurriculumController::class, 'getUserCurriculum']);

    // Route::get('/test-registration', function () {
    //     return view('test_registration');
    // });
