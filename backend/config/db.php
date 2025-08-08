<?php
$host = 'localhost';
$db_name = 'e_tender';
$username = 'root';
$password = '';

try {
    $pdo = new PDO("mysql:host=$host;dbname=$db_name;charset=utf8", $username, $password);
    $pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
    // Set MySQL timezone to match PHP
    $pdo->exec("SET time_zone = '+06:00';");
} catch (PDOException $e) {
    error_log("Database connection failed: " . $e->getMessage());
    header('Content-Type: application/json');
    echo json_encode(["status" => false, "message" => "Database connection error"]);
    exit;
}
?>