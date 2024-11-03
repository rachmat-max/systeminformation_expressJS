<!DOCTYPE html>
<html>
<head>
	<title>Edit Employee</title>
</head>
<body>
	<h1>Edit Employees</h1>
	<form action="/employees/update/<%= employee.id %>" method="POST">
		<input type="text" name="name" value="<%= employee.name %>" required>
		<input type="text" name="position" value="<%= employee.position %>" required>
		<input type="text" name="department" value="<%= employee.department %>" required>
		<button type="submit">Update Employee</button>
	</form>
	<a href="/employees">Back to Employees</a>
</body>
</html>