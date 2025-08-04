<?php
require_once 'send_mail.php';  

// Dummy test values
$test_email = 'abc@gmail.com';  
$test_otp = rand(100000, 999999);

if (sendOTP($test_email, $test_otp)) {
    echo json_encode(["status" => true, "message" => "OTP sent successfully to $test_email"]);
} else {
    echo json_encode(["status" => false, "message" => "Failed to send OTP"]);
}
