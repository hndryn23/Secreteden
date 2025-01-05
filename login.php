<?php
session_start();

// Database connection
$conn = new mysqli('localhost', 'root', '');

// Check connection
if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}

// Database name
$database = 'flower_shop';

// Check if the database exists
$dbCheck = $conn->query("SHOW DATABASES LIKE '$database'");

if ($dbCheck->num_rows == 0) {
    // Create the database
    $createDb = "CREATE DATABASE `$database` CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci";
    if ($conn->query($createDb) === TRUE) {
        echo "Database `$database` created successfully.<br>";
    } else {
        die("Error creating database: " . $conn->error);
    }
}

// Select the database
$conn->select_db($database);

// Check if the necessary tables exist, and create them if not
$tableCheck = $conn->query("SHOW TABLES LIKE 'users'");
if ($tableCheck->num_rows == 0) {
    // Create users table
    $createUsersTable = "
    CREATE TABLE `users` (
      `id` int(11) NOT NULL AUTO_INCREMENT,
      `full_name` varchar(255) NOT NULL,
      `email` varchar(255) NOT NULL UNIQUE,
      `username` varchar(255) NOT NULL UNIQUE,
      `password` varchar(255) NOT NULL,
      `role` enum('admin','user') DEFAULT 'user',
      PRIMARY KEY (`id`)
    ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
    ";
    if ($conn->query($createUsersTable) === TRUE) {
        echo "Table `users` created successfully.<br>";
    } else {
        die("Error creating table `users`: " . $conn->error);
    }

    // Insert default admin user into `users` table (without specifying `id` for auto-increment)
    $insertAdminUser = "
    INSERT INTO `users` (`full_name`, `email`, `username`, `password`, `role`) 
    VALUES 
    ('Admin', 'admin@mail.com', 'admin', 'a665a45920422f9d417e4867efdc4fb8a04a1f3fff1fa07e998e86f7f7a27ae3', 'admin');
    ";
    if ($conn->query($insertAdminUser) === TRUE) {
        echo "Default admin user inserted successfully.<br>";
    } else {
        die("Error inserting default admin user: " . $conn->error);
    }
}

// Check if the payments table exists
$tableCheck = $conn->query("SHOW TABLES LIKE 'payments'");
if ($tableCheck->num_rows == 0) {
    // Create payments table
    $createPaymentsTable = "
    CREATE TABLE `payments` (
      `id` int(11) NOT NULL AUTO_INCREMENT,
      `date` date NOT NULL,
      `amount` decimal(10,2) NOT NULL,
      `category` varchar(255) NOT NULL,
      `description` varchar(255) NOT NULL,
      `payment_method` varchar(255) NOT NULL,
      PRIMARY KEY (`id`)
    ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
    ";
    if ($conn->query($createPaymentsTable) === TRUE) {
        echo "Table `payments` created successfully.<br>";
    } else {
        die("Error creating table `payments`: " . $conn->error);
    }
}

// Handle login
if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $email = $conn->real_escape_string($_POST['email']);
    $password = $conn->real_escape_string($_POST['password']);

    // Hash the password
    $hashedPassword = hash('sha256', $password);

    // Query to find the user
    $sql = "SELECT * FROM users WHERE email = '$email' AND password = '$hashedPassword'";
    $result = $conn->query($sql);

    if ($result->num_rows > 0) {
        $user = $result->fetch_assoc();

        // Set session variables
        $_SESSION['user_id'] = $user['id'];
        $_SESSION['role'] = $user['role'];

        if ($user['role'] === 'admin') {
            header("Location: admin-dashboard.html");
        } else {
            header("Location: index.html");
        }
        exit; // Stop further execution
    } else {
        echo "Invalid email or password!";
    }
}

// Close the connection
$conn->close();
?>
