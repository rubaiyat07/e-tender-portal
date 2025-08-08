<?php
header('Content-Type: application/json');
require_once __DIR__ . '/../../config/db.php';
require_once __DIR__ . '/../../classes/class.user.php';
require_once __DIR__ . '/../../admin/mailer/send_mail.php';

// Check admin authentication here (via session or token)
// if (!isAdminLoggedIn()) { ... }

$data = json_decode(file_get_contents("php://input"));

$admin = new Admin();
$result = $admin->createPEOfficer($data);

http_response_code($result['status'] ? 200 : (strpos($result['message'], 'Server') !== false ? 500 : 400));
echo json_encode($result);
?>