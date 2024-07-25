<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Test Registration</title>
</head>
<body>
    <form action="/api/register/homeschooler" method="POST">
        @csrf
        <input type="text" name="first_name" placeholder="First Name" required>
        <input type="text" name="last_name" placeholder="Last Name" required>
        <input type="email" name="email" placeholder="Email" required>
        <input type="number" name="role_id " placeholder="Role" required>
        <input type="number" name="curriculum_id" placeholder="Curriculum ID" required>
        <button type="submit">Register</button>
    </form>
</body>
</html>
