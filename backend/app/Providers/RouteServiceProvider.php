<?php

namespace App\Providers;

use Illuminate\Auth\Middleware\EnsureEmailIsVerified;
use Illuminate\Support\Facades\Route;
use Illuminate\Foundation\Support\Providers\RouteServiceProvider as ServiceProvider;
use App\Http\Controllers\HomeController;
class RouteServiceProvider extends ServiceProvider
{
    /**
     * Define your route model bindings, pattern filters, and other route configuration.
     *
     * @return void
     */
    public function boot()
    {
        parent::boot();

        // Ensure that email verification is applied
        Route::middleware(['auth', EnsureEmailIsVerified::class])
            ->group(function () {
                // Define your routes here that need email verification
                Route::get('/homeschooler-home', [HomeController::class, 'homeschoolerHome']);
                Route::get('/parent-home', [HomeController::class, 'parentHome']);
                Route::get('/tutor-home', [HomeController::class, 'tutorHome']);
            });
    }

    /**
     * Register any application services.
     *
     * @return void
     */
    public function register()
    {
        //
    }
}
