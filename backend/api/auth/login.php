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

session_start();

header('Content-Type: application/json');
require_once __DIR__ . '/../../config/db.php';
require_once __DIR__ . '/../../classes/class.user.php';
require_once __DIR__ . '/../../admin/mailer/send_mail.php';

$data = json_decode(file_get_contents("php://input"));

// Validate input
if (!isset($data->email, $data->password)) {
    http_response_code(400);
    echo json_encode(["status" => false, "message" => "Email and password are required"]);
    exit;
}

$email = filter_var(trim($data->email), FILTER_VALIDATE_EMAIL);
$password = trim($data->password);

if (!$email) {
    http_response_code(400);
    echo json_encode(["status" => false, "message" => "Invalid email format"]);
    exit;
}

$user = new User();
$result = $user->login($email, $password);

http_response_code($result['status'] ? 200 : (strpos($result['message'], 'Database') !== false ? 500 : 401));
echo json_encode($result);
?>