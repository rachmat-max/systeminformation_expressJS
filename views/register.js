<!DOCTYPE html>
<html>
<head>
	<title>Register</title>
</head>
<body>
	<h1>Register</h1>
	<form action="/register" method="POST">
		<input type="text" name="username" placeholder="Username" required>
		<input type="password" name="password" placeholder="Password" required>
		<button type="submit">Register</button>
	</form>
	<a href="/login">Login</a>
</body>
</html>