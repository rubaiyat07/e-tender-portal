<?php
require_once '../../config/db.php';

class User {
    protected $pdo;
    protected $user_type;

    public function __construct($user_type = 'vendor') {
        global $pdo;
        $this->pdo = $pdo;
        $this->user_type = $user_type;
        date_default_timezone_set('Asia/Dhaka');

        // Start session if not already started
        if (session_status() === PHP_SESSION_NONE) {
            session_start();
        }
    }

    // Vendor registration functionality (only for vendor user_type)
    public function register($data) {
        try {
            // Validate required fields
            if (!isset($data->full_name, $data->email, $data->password)) {
                return ["status" => false, "message" => "Full name, email and password are required"];
            }

            // Sanitize and validate inputs
            $full_name = htmlspecialchars(trim($data->full_name));
            if (empty($full_name)) {
                return ["status" => false, "message" => "Full name cannot be empty"];
            }

            $email = filter_var(trim($data->email), FILTER_VALIDATE_EMAIL);
            if (!$email) {
                return ["status" => false, "message" => "Invalid email format"];
            }

            // Validate password strength
            if (strlen($data->password) < 8) {
                return ["status" => false, "message" => "Password must be at least 8 characters"];
            }
            $password = password_hash($data->password, PASSWORD_DEFAULT);

            // Vendor-specific fields
            $company_name = isset($data->company_name) ? htmlspecialchars(trim($data->company_name)) : '';
            if (empty($company_name)) {
                return ["status" => false, "message" => "Company name is required for vendors"];
            }

            $contact_number = isset($data->contact_number) ? htmlspecialchars(trim($data->contact_number)) : '';
            $nationality = isset($data->nationality) ? htmlspecialchars(trim($data->nationality)) : '';
            $country_of_business = isset($data->country_of_business) ? htmlspecialchars(trim($data->country_of_business)) : '';

            // Check if email already exists
            $stmt = $this->pdo->prepare("SELECT id FROM users WHERE email = ?");
            $stmt->execute([$email]);
            if ($stmt->rowCount() > 0) {
                return ["status" => false, "message" => "Email already registered"];
            }

            // Generate OTP with proper timezone handling
            $now = new DateTime('now', new DateTimeZone('Asia/Dhaka'));
            $otp_expiry = $now->add(new DateInterval('PT10M'))->format('Y-m-d H:i:s');
            $otp_code = strval(rand(100000, 999999));

            // Insert new vendor
            $stmt = $this->pdo->prepare("
                INSERT INTO users (
                    name, email, password, user_type, 
                    company_name, contact_number,
                    nationality, country_of_business, 
                    status, otp_code, otp_expiry
                ) VALUES (?, ?, ?, 'vendor', ?, ?, ?, ?, 0, ?, ?)
            ");
            $stmt->execute([
                $full_name,
                $email,
                $password,
                $company_name,
                $contact_number,
                $nationality,
                $country_of_business,
                $otp_code,
                $otp_expiry
            ]);

            return [
                "status" => true,
                "message" => "Vendor registration successful. Please verify your email with the OTP sent.",
                "otp_code" => $otp_code,
                "user_type" => "vendor"
            ];

        } catch (PDOException $e) {
            error_log("Registration error: " . $e->getMessage());
            return ["status" => false, "message" => "Registration failed. Please try again."];
        }
    }

    // Common OTP verification
    public function verifyOtp($email, $otp) {
        try {
            if (!$email || !preg_match('/^\d{6}$/', $otp)) {
                return ["status" => false, "message" => "Invalid email or OTP format."];
            }

            // Use database's current time in Asia/Dhaka timezone
            $stmt = $this->pdo->prepare("
                SELECT id, status FROM users 
                WHERE email = ? AND otp_code = ? AND otp_expiry >= CONVERT_TZ(NOW(), 'SYSTEM', '+06:00')
            ");
            $stmt->execute([$email, $otp]);
            $user = $stmt->fetch(PDO::FETCH_ASSOC);

            if (!$user) {
                return ["status" => false, "message" => "Invalid OTP or email."];
            }

            if ($user['status'] == 1) {
                return ["status" => true, "message" => "Account is already verified."];
            }

            // Update status
            $update = $this->pdo->prepare("UPDATE users SET status = 1, otp_code = NULL, otp_expiry = NULL WHERE email = ?");
            $update->execute([$email]);

            return ["status" => true, "message" => "OTP verified successfully."];

        } catch (PDOException $e) {
            return ["status" => false, "message" => "Database error: " . $e->getMessage()];
        }
    }

    // Common OTP resend functionality
    public function resendOtp($email) {
        try {
            if (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
                return ["status" => false, "message" => "Invalid email format."];
            }

            // Check if user exists and is unverified
            $stmt = $this->pdo->prepare("SELECT id, otp_expiry FROM users WHERE email = ? AND status = 0");
            $stmt->execute([$email]);
            $user = $stmt->fetch(PDO::FETCH_ASSOC);

            if (!$user) {
                return ["status" => false, "message" => "No unverified user found with this email."];
            }

            // Clear expired OTP using database time
            $stmt = $this->pdo->prepare("UPDATE users SET otp_code = NULL, otp_expiry = NULL WHERE email = ? AND otp_expiry < CONVERT_TZ(NOW(), 'SYSTEM', '+06:00')");
            $stmt->execute([$email]);

            // Generate new OTP with proper timezone
            $now = new DateTime('now', new DateTimeZone('Asia/Dhaka'));
            $otp_expiry = $now->add(new DateInterval('PT10M'))->format('Y-m-d H:i:s');
            $otp_code = strval(rand(100000, 999999));

            // Update user
            $stmt = $this->pdo->prepare("UPDATE users SET otp_code = ?, otp_expiry = ? WHERE email = ?");
            $stmt->execute([$otp_code, $otp_expiry, $email]);

            return [
                "status" => true,
                "message" => "New OTP generated successfully.",
                "otp_code" => $otp_code
            ];

        } catch (PDOException $e) {
            return ["status" => false, "message" => "Database error: " . $e->getMessage()];
        }
    }

    
    // Common login functionality for all user types
    public function login($email, $password) {
        try {
            // Check if user exists
            $stmt = $this->pdo->prepare("SELECT * FROM users WHERE email = ?");
            $stmt->execute([$email]);
            $user = $stmt->fetch(PDO::FETCH_ASSOC);

            if (!$user) {
                return ["status" => false, "message" => "Invalid email or password"];
            }

            // Verify password
            if (!password_verify($password, $user['password'])) {
                return ["status" => false, "message" => "Invalid email or password"];
            }

            // Check if account is verified
            if ($user['status'] != 1) {
                return ["status" => false, "message" => "Account not verified. Please verify your email first."];
            }

            // Create session
            $_SESSION['user_id'] = $user['id'];
            $_SESSION['user_email'] = $user['email'];
            $_SESSION['user_type'] = $user['user_type'];
            $_SESSION['logged_in'] = true;

            // Log login attempt
            $ip = $_SERVER['REMOTE_ADDR'] ?? 'unknown';
            $userAgent = $_SERVER['HTTP_USER_AGENT'] ?? 'unknown';
            
            $logStmt = $this->pdo->prepare("INSERT INTO login_logs (user_id, ip_address, user_agent) VALUES (?, ?, ?)");
            $logStmt->execute([$user['id'], $ip, $userAgent]);

            return [
                "status" => true,
                "message" => "Login successful",
                "user" => [
                    "id" => $user['id'],
                    "name" => $user['name'],
                    "email" => $user['email'],
                    "user_type" => $user['user_type'],
                    "company_name" => $user['company_name']
                ]
            ];

        } catch (PDOException $e) {
            return ["status" => false, "message" => "Database error: " . $e->getMessage()];
        }
    }

    // Add this method to your User class
    public function logout() {
        try 
        {
        // Unset all session variables
        $_SESSION = array();

        // If it's desired to kill the session, also delete the session cookie
        if (ini_get("session.use_cookies")) {
            $params = session_get_cookie_params();
            setcookie(
                session_name(),
                '',
                time() - 42000,
                $params["path"],
                $params["domain"],
                $params["secure"],
                $params["httponly"]
            );
        }

        // Finally, destroy the session
        session_destroy();

        return ["status" => true, "message" => "Successfully logged out"];
        } 
        catch (Exception $e) 
        {
        return ["status" => false, "message" => "Logout failed: " . $e->getMessage()];
        }
    }

    // Vendor-specific methods (now part of User class)
    public function submitBid($bidData) {
        // Implementation for bid submission
        try {
            // Validate bid data
            if (!isset($bidData->tender_id, $bidData->vendor_id, $bidData->bid_amount)) {
                return ["status" => false, "message" => "Missing required bid information"];
            }

            // Insert bid
            $stmt = $this->pdo->prepare("
                INSERT INTO bids (tender_id, vendor_id, bid_amount, proposal, status)
                VALUES (?, ?, ?, ?, 'pending')
            ");
            $stmt->execute([
                $bidData->tender_id,
                $bidData->vendor_id,
                $bidData->bid_amount,
                $bidData->proposal ?? null
            ]);

            return ["status" => true, "message" => "Bid submitted successfully"];

        } catch (PDOException $e) {
            return ["status" => false, "message" => "Database error: " . $e->getMessage()];
        }
    }

    public function getMyBids($vendor_id) {
        // Implementation for retrieving vendor's bids
        try {
            $stmt = $this->pdo->prepare("
                SELECT b.*, t.title as tender_title 
                FROM bids b
                JOIN tenders t ON b.tender_id = t.id
                WHERE b.vendor_id = ?
            ");
            $stmt->execute([$vendor_id]);
            $bids = $stmt->fetchAll(PDO::FETCH_ASSOC);

            return ["status" => true, "bids" => $bids];

        } catch (PDOException $e) {
            return ["status" => false, "message" => "Database error: " . $e->getMessage()];
        }
    }
}
?>