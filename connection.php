<?php
$server = 'localhost';
$username = 'root';
$password = ''; // your MySQL password
$database = 'diet_db';

// Create connection
$conn = new mysqli($server, $username, $password, $database);

// Check connection
if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}
// echo "Connected successfully";
?>
