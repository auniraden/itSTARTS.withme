<?php

return [
    'paths' => ['*','api/*', 'sanctum/csrf-cookie', '/csrf-token'],

    'allowed_methods' => ['*'],

    'allowed_origins' => [env('http://localhost:3000')],
    // explode(',', env('FRONTEND_URLS')),

    'allowed_origins_patterns' => [],

    'allowed_headers' => ['*'],

    'exposed_headers' => [],

    'max_age' => 0,

    'supports_credentials' => true,
];
