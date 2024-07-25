<!DOCTYPE html>
<html>
<head>
    <title>Registration Confirmation</title>
</head>
<body>
    <p>Hi {{ $name }},</p>
    <p>Thank you for registering! Click the link below to verify your email address:</p>
    <a href="{{ $verificationUrl }}">Verify Email Address</a>
</body>
</html>
