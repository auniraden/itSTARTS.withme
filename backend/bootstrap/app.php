<?php

use Illuminate\Foundation\Application;
use Illuminate\Foundation\Configuration\Exceptions;
use Illuminate\Foundation\Configuration\Middleware;
use Illuminate\Routing\Middleware\ThrottleRequests;
use Laravel\Sanctum\Http\Middleware\EnsureFrontendRequestsAreStateful;
use Illuminate\Routing\Middleware\SubstituteBindings;


return Application::configure(basePath: dirname(__DIR__))
    ->withRouting(
        function(\Illuminate\Routing\Router $router){
            $router->middleware('api')
            ->prefix('api')
            ->group(base_path('routes/api.php'));

             // Load web routes
             $router->middleware('web')
             ->group(base_path('routes/web.php'));
        }



    )
    ->withMiddleware(function (Middleware $middleware) {
        $middleware->api(append: [ SubstituteBindings::class,]);
        $middleware->api(append: [ ThrottleRequests::class,]);
        $middleware->api(append: [ EnsureFrontendRequestsAreStateful::class,]);
    })
    ->withExceptions(function (Exceptions $exceptions) {
        //
    })->create();
