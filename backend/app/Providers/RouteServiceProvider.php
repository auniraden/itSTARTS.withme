<?php

namespace App\Providers;

use Illuminate\Support\Facades\Route;
use Illuminate\Foundation\Support\Providers\RouteServiceProvider as ServiceProvider;

class RouteServiceProvider extends ServiceProvider
{
    protected $namespace = 'App\Http\Controllers';

    public function boot()
    {
        parent::boot();

        // Ensure that email verification is applied
        Route::middleware(['auth', 'verified'])
            ->group(function () {
                Route::get('/homeschooler-home', 'HomeController@homeschoolerHome');
                Route::get('/parent-home', 'HomeController@parentHome');
                Route::get('/tutor-home', 'HomeController@tutorHome');
            });
    }

    public function map()
    {
        $this->mapApiRoutes();
        $this->mapWebRoutes();
    }

    protected function mapWebRoutes()
    {
        Route::middleware('web')
            ->namespace($this->namespace)
            ->group(base_path('routes/web.php'));
    }

    protected function mapApiRoutes()
    {
        Route::prefix('api')
            ->middleware('api')
            ->namespace($this->namespace)
            ->group(base_path('routes/api.php'));
    }

    protected $middleware = [
        // Other middleware
        \App\Http\Middleware\CorsMiddleware::class,
    ];
}
