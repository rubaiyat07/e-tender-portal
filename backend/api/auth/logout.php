<?php
header('Content-Type: application/json');
require_once __DIR__ . '/../../config/db.php';
require_once __DIR__ . '/../../classes/class.user.php';

// Start the session
session_start();

// Create user instance
$user = new User();

// Perform logout
$result = $user->logout();

// Return the result
http_response_code($result['status'] ? 200 : 500);
echo json_encode($result);
?>