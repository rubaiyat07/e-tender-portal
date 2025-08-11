<?php
//CORS Headers
header("Access-Control-Allow-Origin: http://localhost:5173");
header("Access-Control-Allow-Credentials: true");
header("Access-Control-Allow-Headers: Content-Type, Authorization");
header("Access-Control-Allow-Methods: POST, OPTIONS");

if($_SERVER['REQUEST_METHOD'] === 'OPTIONS')
{
    http_response_code(200);
    exit;
}

// Start the session
session_start();

header('Content-Type: application/json');
require_once __DIR__ . '/../../config/db.php';
require_once __DIR__ . '/../../classes/class.user.php';

// Create user instance
$user = new User();

// Perform logout
$result = $user->logout();

// Return the result
http_response_code($result['status'] ? 200 : 500);
echo json_encode($result);
?>