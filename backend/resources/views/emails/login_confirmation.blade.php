<!DOCTYPE html>
<html>
<head>
    <title>Login Confirmation</title>
</head>
<body>
    <p>Hi {{ $name }},</p>
    <p>Welcome back! Click the link below to go to your dashboard:</p>
    <a href="{{ $loginUrl }}">Go to Dashboard</a>
</body>
</html>
