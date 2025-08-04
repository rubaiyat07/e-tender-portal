<?php
require_once '../../config/db.php';
require_once '../../vendor/autoload.php';
use \Firebase\JWT\JWT;

header('Content-Type: application/json');
$key = "your_secret_key"; // You can define this in a config file

$data = json_decode(file_get_contents("php://input"));
if (!isset($data->email, $data->password)) {
    echo json_encode(["status" => false, "message" => "Email and password required"]);
    exit;
}

$email = $data->email;
$password = $data->password;

try {
    $stmt = $pdo->prepare("SELECT * FROM users WHERE email = ?");
    $stmt->execute([$email]);
    $user = $stmt->fetch(PDO::FETCH_ASSOC);

    if (!$user || !password_verify($password, $user['password'])) {
        echo json_encode(["status" => false, "message" => "Invalid credentials"]);
        exit;
    }

    $payload = [
        'iss' => 'http://localhost',
        'aud' => 'http://localhost',
        'iat' => time(),
        'exp' => time() + (60 * 60), // 1 hour expiry
        'data' => [
            'id' => $user['id'],
            'email' => $user['email'],
            'user_type' => $user['user_type']
        ]
    ];

    $jwt = JWT::encode($payload, $key, 'HS256');
    echo json_encode(["status" => true, "token" => $jwt, "user" => $user]);
} catch (PDOException $e) {
    echo json_encode(["status" => false, "message" => "DB Error", "error" => $e->getMessage()]);
}
