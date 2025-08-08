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
require_once __DIR__ . '/../../admin/mailer/send_mail.php';
require_once __DIR__ . '/../../classes/class.user.php';

date_default_timezone_set('Asia/Dhaka');
$data = json_decode(file_get_contents("php://input"));

// Only allow vendor registration through this endpoint
if (isset($data->user_type)) 
{
    $user_type = htmlspecialchars(trim($data->user_type));
    if ($user_type !== 'vendor') {
        http_response_code(403);
        echo json_encode(["status" => false, "message" => "Only vendor self-registration is allowed"]);
        exit;
    }
}

// Create user instance (will always be vendor for this endpoint)
$user = new User();
$result = $user->register($data);

// If registration was successful, send OTP email
if ($result['status']) {
    $subject = "OTP Verification for Your Account";
    $body = "
        <h3>Hello {$data->full_name},</h3>
        <p>Thank you for registering as a vendor.</p>
        <p>Your One-Time Password (OTP) is: <strong>{$result['otp_code']}</strong></p>
        <p>This OTP is valid for 10 minutes.</p>
        <br>
        <p>Regards,<br>Procurement Team</p>
    ";

    $mailSent = send_mail($data->email, $subject, $body);

    if (!$mailSent) {
        $result['message'] = "Registration successful, but failed to send OTP email";
    }
}

http_response_code($result['status'] ? 200 : (strpos($result['message'], 'Server') !== false ? 500 : 400));
echo json_encode($result);
?>