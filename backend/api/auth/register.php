<?php
header('Content-Type: application/json');

// Include necessary files
require_once '../../config/db.php';
require_once '../../admin/mailer/send_mail.php';

// Setting preferred timezone
date_default_timezone_set('Asia/Dhaka'); 

// Decode incoming JSON request
$data = json_decode(file_get_contents("php://input"));

// Validate required fields
if (!isset($data->full_name, $data->email, $data->password)) {
    echo json_encode(["status" => false, "message" => "Missing required fields"]);
    exit;
}

// Sanitize and assign values
$full_name = htmlspecialchars(trim($data->full_name));
$email = filter_var(trim($data->email), FILTER_VALIDATE_EMAIL);
if (!$email) {
    echo json_encode(["status" => false, "message" => "Invalid email format"]);
    exit;
}
$password = password_hash($data->password, PASSWORD_DEFAULT);
$contact_number = isset($data->contact_number) ? htmlspecialchars(trim($data->contact_number)) : '';
$user_type = isset($data->user_type) ? htmlspecialchars(trim($data->user_type)) : 'vendor';
$company_name = isset($data->company_name) ? htmlspecialchars(trim($data->company_name)) : '';
$nationality = isset($data->nationality) ? htmlspecialchars(trim($data->nationality)) : '';
$country_of_business = isset($data->country_of_business) ? htmlspecialchars(trim($data->country_of_business)) : '';

// Generate OTP and expiry
$otp_code = strval(rand(100000, 999999));
$otp_expiry = date('Y-m-d H:i:s', strtotime('+10 minutes'));

try {
    // Check if email already exists
    $stmt = $pdo->prepare("SELECT id FROM users WHERE LOWER(email) = LOWER(?)");
    $stmt->execute([$email]);

    if ($stmt->rowCount() > 0) {
        http_response_code(400);
        echo json_encode(["status" => false, "message" => "Email already registered"]);
        exit;
    }

    // Insert new user with OTP and inactive status
    $stmt = $pdo->prepare("
        INSERT INTO users (
            name, email, password, user_type, company_name, contact_number,
            nationality, country_of_business, status, otp_code, otp_expiry
        ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
    ");
    $stmt->execute([
        $full_name,
        $email,
        $password,
        $user_type,
        $company_name,
        $contact_number,
        $nationality,
        $country_of_business,
        0, // status: inactive until OTP is verified
        $otp_code,
        $otp_expiry
    ]);

    // Send OTP email
    $subject = "OTP Verification for Your Account";
    $body = "
        <h3>Hello {$full_name},</h3>
        <p>Thank you for registering.</p>
        <p>Your One-Time Password (OTP) is: <strong>{$otp_code}</strong></p>
        <p>This OTP is valid for 10 minutes.</p>
        <br>
        <p>Regards,<br>Team Admin</p>
    ";

    $mailSent = send_mail($email, $subject, $body);

    if (!$mailSent) {
        echo json_encode(["status" => false, "message" => "Registration successful, but failed to send OTP email"]);
        exit;
    }

    echo json_encode([
        "status" => true,
        "message" => "Registration successful. OTP sent to your email.",
        "otp_debug" => $otp_code // remove this in production
    ]);
} catch (PDOException $e) {
    http_response_code(500);
    echo json_encode(["status" => false, "message" => "Server error: " . $e->getMessage()]);
}
