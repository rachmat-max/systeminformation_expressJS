<!DOCTYPE html>
<html>
<head>
	<title>Employee Management</title>
</head>
<body>
	<h1>Employees</h1>
	<form action="/employees" method="POST">
		<input type="text" name="name" placeholder="Name" required>
		<input type="text" name="position" placeholder="Position" required>
		<input type="text" name="department" placeholder="Department" required>
		<button type="submit">Add Employee</button>
	</form>
	<table>
		<tr>
			<th>Name</th>
			<th>Position</th>
			<th>Department</th>
			<th>Action</th>
		<tr>
		<% employees.forEach(employee => { %>
			<tr>
				<td><%= employee.name %></td>
				<td><%= employee.position %></td>
				<td><%= employee.department %></td>
				<td>
					<a href="/employees/edit/<%= employee.id %>">Edit</a>
					<form action="/employees/delete/<%= employee.id %>" method="POST">
						<button type="submit">Delete</button>
					</form>
				</td>
			</tr>
		<% }) %>
	</table>
</body>
</html>