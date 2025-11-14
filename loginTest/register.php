<?php
session_start();

$dsn = "mysql:host=localhost;dbname=gurtbase;charset=utf8mb4";
$dbUser = "your_db_username";
$dbPass = "your_db_password";

try {
    $pdo = new PDO($dsn, $dbUser, $dbPass);
    $pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
} catch (PDOException $e) {
    die("DB Connection failed: " . $e->getMessage());
}

if ($_SERVER["REQUEST_METHOD"] == "POST") {
    $fname = trim($_POST["fname"]);
    $lname = trim($_POST["lname"]);
    $email = trim($_POST["email"]);
    $password = trim($_POST["password"]);

    // Validation
    if (empty($fname) || empty($lname) || empty($email) || empty($password)) {
        die("All fields are required.");
    }

    if (strlen($password) < 8) {
        die("Password must be at least 8 characters long.");
    }

    // Check if email already exists
    $stmt = $pdo->prepare("SELECT userID FROM User WHERE userEmail = :email");
    $stmt->execute([":email" => $email]);
    if ($stmt->fetch()) {
        die("Email already registered.");
    }

    // Hash password
    $hashedPassword = password_hash($password, PASSWORD_DEFAULT);

    // Insert new user
    $stmt = $pdo->prepare("INSERT INTO User (userEmail, userPass, userFirstName, userLastName) 
                           VALUES (:email, :pass, :fname, :lname)");
    $stmt->execute([
        ":email" => $email,
        ":pass" => $hashedPassword,
        ":fname" => $fname,
        ":lname" => $lname
    ]);

    echo "Registration successful. <a href='login.html'>Login here</a>";
}
?>