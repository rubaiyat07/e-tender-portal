<?php
header('Content-Type: application/json');
require_once '../../config/db.php';
require_once '../../admin/mailer/send_mail.php';

try {
    $data = json_decode(file_get_contents("php://input"));
    
    // Validate input
    if (!isset($data->email)) {
        http_response_code(400);
        echo json_encode(["status" => false, "message" => "Email is required."]);
        exit;
    }

    $email = filter_var(trim($data->email), FILTER_VALIDATE_EMAIL);
    if (!$email) {
        http_response_code(400);
        echo json_encode(["status" => false, "message" => "Invalid email format."]);
        exit;
    }

    // Check if user exists and is unverified
    $stmt = $pdo->prepare("SELECT id, otp_expiry FROM users WHERE email = ? AND status = 0");
    $stmt->execute([$email]);
    $user = $stmt->fetch(PDO::FETCH_ASSOC);

    if (!$user) {
        http_response_code(404);
        echo json_encode(["status" => false, "message" => "No unverified user found with this email."]);
        exit;
    }

    // Clear expired OTP
    if ($user['otp_expiry'] && $user['otp_expiry'] < date('Y-m-d H:i:s')) {
        $stmt = $pdo->prepare("UPDATE users SET otp_code = NULL, otp_expiry = NULL WHERE email = ?");
        $stmt->execute([$email]);
    }

    // Generate new OTP
    $otp_code = strval(rand(100000, 999999));
    $otp_expiry = date('Y-m-d H:i:s', strtotime('+10 minutes'));

    // Update user with new OTP
    $stmt = $pdo->prepare("UPDATE users SET otp_code = ?, otp_expiry = ? WHERE email = ?");
    $stmt->execute([$otp_code, $otp_expiry, $email]);

    // Prepare email content
    $subject = "Your New OTP Code";
    $body = "
        <h3>OTP Resend Request</h3>
        <p>Your new One-Time Password (OTP) is: <strong>{$otp_code}</strong></p>
        <p>This OTP is valid for 10 minutes.</p>
        <p>If you didn't request this, please ignore this email.</p>
    ";

    // Send the OTP email
    if (send_mail($email, $subject, $body)) {
        echo json_encode(["status" => true, "message" => "New OTP sent successfully."]);
    } else {
        http_response_code(500);
        echo json_encode(["status" => false, "message" => "Failed to send OTP email. Please try again."]);
    }

} catch (PDOException $e) {
    http_response_code(500);
    echo json_encode(["status" => false, "message" => "Database error occurred."]);
} catch (Exception $e) {
    http_response_code(500);
    echo json_encode(["status" => false, "message" => "An unexpected error occurred."]);
}