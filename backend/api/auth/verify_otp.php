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

date_default_timezone_set('Asia/Dhaka');
$data = json_decode(file_get_contents("php://input"));

if (!isset($data->email, $data->otp)) {
    http_response_code(400);
    echo json_encode(["status" => false, "message" => "Email and OTP are required."]);
    exit;
}

$email = filter_var(trim($data->email), FILTER_VALIDATE_EMAIL);
$otp = trim($data->otp);

$user = new User();
$result = $user->verifyOtp($email, $otp);

http_response_code($result['status'] ? 200 : (strpos($result['message'], 'Database') !== false ? 500 : 400));
echo json_encode($result);
?>