<!DOCTYPE html>
<html>
<head>
    <title>Registration Confirmation</title>
</head>
<body>
    <p>Hi {{ $name }},</p>
    <p>Thank you for registering with itSTARTS! Click the link below to verify your email address:</p>
    <a href="{{ $verificationUrl }}">Verify Email Address</a>
    <p>All the best, and it all starts with you 😉</p>
    <p>If you did not create an account, no further action is required.</p>
</body>
</html>
