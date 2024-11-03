CREATE DATABASE employee_management;
USE employee_management;

CREATE TABLE users (
	id INT AUTO_INCREMENT PRIMARY KEY,
	username VARCHAR(255) NOT NULL,
	password VARCHAR(255) NOT NULL
);

CREATE TABLE employees (
	id INT AUTO_INCREMENT PRIMARY KEY,
	name VARCHAR(255) NOT NULL,
	position VARCHAR(255) NOT NULL,
	department VARCHAR(255) NOT NULL
);