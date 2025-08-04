<?php
use PHPMailer\PHPMailer\PHPMailer;
use PHPMailer\PHPMailer\Exception;

require_once __DIR__ . '/PHPMailer.php';
require_once __DIR__ . '/SMTP.php';
require_once __DIR__ . '/POP3.php';
require_once __DIR__ . '/Exception.php'; // ✅ fix

function sendOTP($email, $otp_code) {
    $mail = new PHPMailer(true);

    try {
        $mail->isSMTP();
        $mail->Host = 'smtp.gmail.com'; 
        $mail->SMTPAuth = true;
        $mail->Username = 'xyz@gmail.com'; 
        $mail->Password = '*************';     
        $mail->SMTPSecure = 'tls';
        $mail->Port = 587;

        $mail->setFrom('xyz@gmail.com', 'E-Tender Portal');
        $mail->addAddress($email);

        $mail->isHTML(true);
        $mail->Subject = 'Your OTP Code';
        $mail->Body    = "Your OTP verification code is <strong>$otp_code</strong>";

        $mail->send();
        return true;
    } catch (Exception $e) {
        error_log('Mail Error: ' . $e->getMessage());
        return false;
    }
}
