<!DOCTYPE html>
<html>
<head>
    <title>A Letter from {{$createdDate}}</title>
</head>
<body>
    <h1>Hello, Future Me!</h1>
    <p>{{ $messageContent }}</p>
    <p>This letter was written on {{ $createdDate }} and scheduled for delivery on {{ $deliveryDate }}.</p>
</body>
</html>
