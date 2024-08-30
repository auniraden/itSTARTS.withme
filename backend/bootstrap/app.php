<?php

use Illuminate\Foundation\Application;
use Illuminate\Foundation\Configuration\Exceptions;
use Illuminate\Foundation\Configuration\Middleware;
use Illuminate\Routing\Middleware\ThrottleRequests;
use Laravel\Sanctum\Http\Middleware\EnsureFrontendRequestsAreStateful;
use Illuminate\Routing\Middleware\SubstituteBindings;
use Illuminate\Console\Scheduling\Schedule;
use App\Console\Commands\SendScheduledEmails;
use Illuminate\Console\Application as ArtisanApplication;
use App\Http\Middleware\EncryptCookies;
use Illuminate\Http\Request;
use App\Exceptions\AlreadyAuthenticatedException;


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
    // ->withMiddleware(function (Middleware $middleware) {
    //     $middleware->api(append: [ SubstituteBindings::class,]);
    //     $middleware->api(append: [ ThrottleRequests::class,]);
    //     $middleware->api(append: [ EnsureFrontendRequestsAreStateful::class,]);
    // })
    ->withMiddleware(function (Middleware $middleware ){
        $middleware->web(append: [
        \Illuminate\Cookie\Middleware\AddQueuedCookiesToResponse::class,
        \Illuminate\Session\Middleware\StartSession::class,
        \Illuminate\View\Middleware\ShareErrorsFromSession::class,
        SubstituteBindings::class,
        \Illuminate\Http\Middleware\HandleCors::class,]);
    })

    ->withMiddleware(function (Middleware $middleware) {
        $middleware->statefulApi();
    })

    ->withExceptions(function (Exceptions $exceptions) {
        //
    })

    ->withSchedule(function (Schedule $schedule) {
        $schedule->command('emails:send-scheduled')->daily();
    })

    ->create();
