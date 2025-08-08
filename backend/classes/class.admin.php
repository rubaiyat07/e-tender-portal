<?php
require_once 'class.user.php';

class Admin extends User {
    public function __construct() {
        parent::__construct('admin');
    }

    // In the Admin class, add these methods:
    public function createPEOfficer($peOfficerData) 
    {
        try 
        {
        // Validate required fields
        if (!isset($peOfficerData->full_name, $peOfficerData->email, $peOfficerData->password)) {
            return ["status" => false, "message" => "Missing required fields"];
        }

        // Sanitize inputs
        $full_name = htmlspecialchars(trim($peOfficerData->full_name));
        $email = filter_var(trim($peOfficerData->email), FILTER_VALIDATE_EMAIL);
        if (!$email) {
            return ["status" => false, "message" => "Invalid email format"];
        }
        
        $password = password_hash($peOfficerData->password, PASSWORD_DEFAULT);
        $contact_number = isset($peOfficerData->contact_number) ? htmlspecialchars(trim($peOfficerData->contact_number)) : '';

        // Check if email exists
        $stmt = $this->pdo->prepare("SELECT id FROM users WHERE LOWER(email) = LOWER(?)");
        $stmt->execute([$email]);

        if ($stmt->rowCount() > 0) {
            return ["status" => false, "message" => "Email already registered"];
        }

        // Insert new PE Officer (immediately active, no OTP needed)
        $stmt = $this->pdo->prepare("
            INSERT INTO users (
                name, email, password, user_type, contact_number, status
            ) VALUES (?, ?, ?, 'pe_officer', ?, 1)
        ");
        $stmt->execute([
            $full_name,
            $email,
            $password,
            $contact_number
        ]);

        return ["status" => true, "message" => "PE Officer created successfully"];

        } 
        catch (PDOException $e) 
        {
        return ["status" => false, "message" => "Server error: " . $e->getMessage()];
        }
    }


    // Admin-specific methods
    public function createTender($tenderData) {
        try {
            // Validate tender data
            if (!isset($tenderData->title, $tenderData->description, $tenderData->created_by)) {
                return ["status" => false, "message" => "Missing required tender information"];
            }

            // Insert tender
            $stmt = $this->pdo->prepare("
                INSERT INTO tenders (
                    title, description, category, publish_date, deadline, 
                    budget, created_by, status
                ) VALUES (?, ?, ?, ?, ?, ?, ?, 'open')
            ");
            $stmt->execute([
                $tenderData->title,
                $tenderData->description,
                $tenderData->category ?? null,
                $tenderData->publish_date ?? null,
                $tenderData->deadline ?? null,
                $tenderData->budget ?? null,
                $tenderData->created_by
            ]);

            return ["status" => true, "message" => "Tender created successfully"];

        } catch (PDOException $e) {
            return ["status" => false, "message" => "Database error: " . $e->getMessage()];
        }
    }

    public function getAllUsers() {
        try {
            $stmt = $this->pdo->prepare("SELECT * FROM users");
            $stmt->execute();
            $users = $stmt->fetchAll(PDO::FETCH_ASSOC);

            return ["status" => true, "users" => $users];

        } catch (PDOException $e) {
            return ["status" => false, "message" => "Database error: " . $e->getMessage()];
        }
    }

    public function updateUserStatus($user_id, $status) {
        try {
            $stmt = $this->pdo->prepare("UPDATE users SET status = ? WHERE id = ?");
            $stmt->execute([$status, $user_id]);

            return ["status" => true, "message" => "User status updated successfully"];

        } catch (PDOException $e) {
            return ["status" => false, "message" => "Database error: " . $e->getMessage()];
        }
    }
}
?>