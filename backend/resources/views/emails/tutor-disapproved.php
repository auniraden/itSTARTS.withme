<!DOCTYPE html>
<html>
<head>
    <title>Tutor Application Disapproved</title>
</head>
<body>
    <h1>Dear {{ $name }},</h1>
    <p>We regret to inform you that your application to be a tutor on our platform has not been approved. The reasons for this decision are as follows:</p>
    <ul>
        @foreach($reasons as $reason)
            <li>{{ $reason }}</li>
        @endforeach
    </ul>
    <p>Please feel free to contact us if you have any questions or require further clarification.</p>
    <p>Thank you for your interest in joining our platform.</p>
    <p>Best regards,</p>
    <p>The Admin Team</p>
</body>
</html>
