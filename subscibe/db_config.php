<?php
$host = 'localhost'; // Database host
$username = 'root';  // Your database username
$password = '';      // Your database password
$dbname = 'flower_shop'; // Your database name

// Create a connection
$conn = new mysqli($host, $username, $password, $dbname);

// Check connection
if ($conn->connect_error) {
    die("Database connection failed: " . $conn->connect_error);
}
?>
