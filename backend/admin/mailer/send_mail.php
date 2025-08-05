<?php
use PHPMailer\PHPMailer\PHPMailer;
use PHPMailer\PHPMailer\Exception;

require_once __DIR__ . '/PHPMailer.php';
require_once __DIR__ . '/SMTP.php';
require_once __DIR__ . '/POP3.php';
require_once __DIR__ . '/Exception.php';

function send_mail($to, $subject, $body) {
    $mail = new PHPMailer(true);

    try {
        // Server settings
        $mail->isSMTP();
        $mail->Host = 'smtp.gmail.com'; 
        $mail->SMTPAuth = true;
        $mail->Username = 'xyz@gmail.com'; 
        $mail->Password = '**************';     
        $mail->SMTPSecure = 'tls';
        $mail->Port = 587;
        $mail->CharSet = 'UTF-8';

        // Recipients
        $mail->setFrom('xyz@gmail.com', 'E-Tender Portal');
        $mail->addAddress($to);  // Fixed: using the parameter $to instead of undefined $email

        // Content
        $mail->isHTML(true);
        $mail->Subject = $subject;  // Using the parameter instead of hardcoded subject
        $mail->Body = $body;        // Using the parameter instead of undefined $otp_code

        $mail->send();
        return true;
    } catch (Exception $e) {
        error_log('Mail Error: ' . $e->getMessage());
        return false;
    }
}