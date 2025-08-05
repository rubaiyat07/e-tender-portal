<?php 
require_once(__DIR__ . '/backend/config/db.php'); 


// Admin Credentials
$name = "Admin";
$email = "admin@example.com";
$raw_password = '010101';
$hashed_password = password_hash($raw_password, PASSWORD_DEFAULT);
$user_type = 'admin';
$status = 2;

// Check if admin already exists
$stmt = $pdo->prepare("SELECT id FROM users WHERE email = ?");
$stmt->execute([$email]);

if ($stmt->rowCount() > 0) {
    echo "Admin user already exists.";
    exit;
}

// Insert new admin
$insert = $pdo->prepare("INSERT INTO users (name, email, password, user_type, status) VALUES (?, ?, ?, ?, ?)");

if ($insert->execute([$name, $email, $hashed_password, $user_type, $status])) {
    echo "Admin created successfully.";
} else {
    echo "Failed to create admin.";
}
