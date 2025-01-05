<?php
$host = 'localhost';
$user = 'root';
$password = ''; // Replace with your database password
$dbname = 'flower_shop';

// Connect to MySQL
$conn = new mysqli($host, $user, $password);

if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}

// Read and execute the SQL file
$sqlFile = 'database.sql';
$sqlContent = file_get_contents($sqlFile);

if ($conn->multi_query($sqlContent)) {
    echo "Database setup successfully.";
} else {
    echo "Error setting up database: " . $conn->error;
}

$conn->close();
?>
