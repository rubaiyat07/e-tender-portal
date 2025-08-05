<?php
header('Content-Type: application/json');
require_once '../../config/db.php';

$data = json_decode(file_get_contents("php://input"));

// Check required fields
if (!isset($data->email, $data->otp)) {
    http_response_code(400);
    echo json_encode(["status" => false, "message" => "Email and OTP are required."]);
    exit;
}

$email = filter_var(trim($data->email), FILTER_VALIDATE_EMAIL);
$otp = trim($data->otp);

if (!$email || !preg_match('/^\d{6}$/', $otp)) {
    http_response_code(400);
    echo json_encode(["status" => false, "message" => "Invalid email or OTP format."]);
    exit;
}

try 
{
    // Check if user with matching OTP and email exists
    $stmt = $pdo->prepare("
        SELECT id, status FROM users 
        WHERE email = ? AND otp_code = ? AND otp_expiry >= NOW()
    ");
    $stmt->execute([$email, $otp]);
    $user = $stmt->fetch(PDO::FETCH_ASSOC);

    if (!$user) {
        http_response_code(400);
        echo json_encode(["status" => false, "message" => "Invalid OTP or email."]);
        exit;
    }

    if ($user['status'] == 1) {
        echo json_encode(["status" => true, "message" => "Account is already verified."]);
        exit;
    }

    // Valid OTP, update status
    $update = $pdo->prepare("UPDATE users SET status = 1, otp_code = NULL, otp_expiry = NULL WHERE email = ?");
    $update->execute([$email]);

    echo json_encode(["status" => true, "message" => "OTP verified successfully."]);

} 

catch (PDOException $e) 
{
    http_response_code(500);
    echo json_encode([
        "status" => false,
        "message" => "Database error",
        "error" => $e->getMessage()
    ]);
}
?>
