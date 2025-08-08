<?php
header("Access-Control-Allow-Origin: http://localhost:5173");
header("Access-Control-Allow-Credentials: true");
header("Access-Control-Allow-Headers: Content-Type, Authorization");
header("Access-Control-Allow-Methods: POST, OPTIONS");

if($_SERVER['REQUEST_METHOD'] === 'OPTIONS')
{
    http_response_code(200);
    exit;
}

header('Content-Type: application/json');
require_once __DIR__ . '/../../config/db.php';
require_once __DIR__ . '/../../classes/class.user.php';
require_once __DIR__ . '/../../admin/mailer/send_mail.php';

date_default_timezone_set('Asia/Dhaka');
$data = json_decode(file_get_contents("php://input"));

if (!isset($data->email)) {
    http_response_code(400);
    echo json_encode(["status" => false, "message" => "Email is required."]);
    exit;
}

$email = filter_var(trim($data->email), FILTER_VALIDATE_EMAIL);

$user = new User();
$result = $user->resendOtp($email);

// If OTP was regenerated successfully, send email
if ($result['status']) {
    $subject = "Your New OTP Code";
    $body = "
        <h3>OTP Resend Request</h3>
        <p>Your new One-Time Password (OTP) is: <strong>{$result['otp_code']}</strong></p>
        <p>This OTP is valid for 10 minutes.</p>
        <p>If you didn't request this, please ignore this email.</p>
    ";

    if (!send_mail($email, $subject, $body)) {
        $result = ["status" => false, "message" => "Failed to send OTP email. Please try again."];
    }
}

http_response_code($result['status'] ? 200 : (strpos($result['message'], 'Database') !== false ? 500 : 400));
echo json_encode($result);
?>