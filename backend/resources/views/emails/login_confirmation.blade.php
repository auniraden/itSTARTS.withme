<!DOCTYPE html>
<html>
<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <title>Check your email to sign in!</title>
    <style>
        body {
            font-family: Arial, sans-serif;
            line-height: 1.6;
            color: #333;
            max-width: 600px;
            margin: 0 auto;
            padding: 20px;
            background-color: #f4f4f4;
        }
        .container {
            background-color: #ffffff;
            border-radius: 5px;
            padding: 30px;
            box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
        }
        h1 {
            color: #4a4a4a;
            text-align: center;
        }
        .logo {
            text-align: center;
            margin-bottom: 20px;
        }
        .button {
            display: inline-block;
            background-color: #FE4632;
            color: #ffffff;
            text-decoration: none;
            padding: 10px 20px;
            border-radius: 5px;
            margin-top: 20px;
        }
        .footer {
            margin-top: 30px;
            text-align: center;
            font-size: 0.9em;
            color: #888;
        }
    </style>
</head>
<body>
    <div class="container">
        <div class="logo">

            <img src="{{ asset('img/itstarts-logo-final.png') }}" alt="itSTARTS Logo" width="150">
        </div>
        <h1>Welcome back to itSTARTS!</h1>
        <p>Hi {{ $name }},</p>
        <p>Glad you're back! To continue to sign in, click the button below to continue.  </p>
        <p style="text-align: center;">
            <a href="{{ $loginUrl }}" class="button">Sign in</a>
        </p>
        <p>It all starts with you! 😉</p>
        <p>Regards,<br>The itSTARTS Team</p>
    </div>
    <div class="footer">
        <p>&copy; {{ date('Y') }} itSTARTS. All rights reserved.</p>
    </div>
</body>
</html>
