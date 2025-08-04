<?php
header('Content-Type: application/json');
require_once '../../config/db.php';
require_once '../../admin/mailer/send_mail.php';
sendOTP($email, $otp_code);


$data = json_decode(file_get_contents("php://input"));

if (!isset($data->full_name, $data->email, $data->password)) {
    echo json_encode(["status" => false, "message" => "Missing required fields"]);
    exit;
}

$full_name = htmlspecialchars($data->full_name);
$email = htmlspecialchars($data->email);
$password = password_hash($data->password, PASSWORD_DEFAULT);
$phone = isset($data->phone) ? htmlspecialchars($data->phone) : '';
$user_type = isset($data->user_type) ? $data->user_type : 'vendor';
$otp_code = strval(rand(100000, 999999));


try {
    $stmt = $pdo->prepare("SELECT id FROM users WHERE email = ?");
    $stmt->execute([$email]);

    if ($stmt->rowCount()) {
        echo json_encode(["status" => false, "message" => "Email already registered"]);
        exit;
    }

    $stmt = $pdo->prepare("INSERT INTO users (full_name, email, phone, password, user_type, otp_code) VALUES (?, ?, ?, ?, ?, ?)");
    $stmt->execute([$full_name, $email, $phone, $password, $user_type, $otp_code]);


    echo json_encode(["status" => true, "message" => "Registration successful"]);
} catch (PDOException $e) {
    echo json_encode(["status" => false, "message" => "Database error", "error" => $e->getMessage()]);
}
