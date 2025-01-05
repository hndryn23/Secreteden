<?php
// Database connection
$servername = "localhost";
$username = "root";
$password = "";
$dbname = "flower_shop";

$conn = new mysqli($servername, $username, $password, $dbname);

// Check connection
if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}

// Fetch data from the subscription table where the date is today
$sql = "SELECT * FROM payments WHERE date = CURDATE()"; // CURDATE() gives today's date in 'YYYY-MM-DD' format
$result = $conn->query($sql);

$data = [];
if ($result && $result->num_rows > 0) {
    while ($row = $result->fetch_assoc()) {
        $data[] = $row;
    }
}

$conn->close();

// Return data as JSON
header('Content-Type: application/json');
echo json_encode($data);
?>
