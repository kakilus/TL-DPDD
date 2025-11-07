<?php 
session_start(); ?>



<!DOCTYPE html>

<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Home</title>
    <link rel="stylesheet" href="assets/css/styles.css">
    <link rel="icon" type="image/x-icon" href="assets/images/logo.png">
    <script src='assets/js/emailRegistered.js'></script>
</head>
<body>

    <?php $pageName = "Home Page";
    include("templates/header.php");
    include("templates/sidebar.php") ?>
    
    <main>
        <?php
            $dsn = "sqlite:my_database.db";
            $pdo = new PDO($dsn);
            $query = $pdo->query("SELECT email FROM users");
            $emails = $query->fetchAll(PDO::FETCH_ASSOC);

            if (isset($_POST['user'], $_POST['password'], $_POST['email'])) {
                $name = $_POST['user'];
                $email = $_POST['email'];
                $isAdmin = 0;
                $password = password_hash($_POST['password'], PASSWORD_DEFAULT);
                $alreadyExists = false;

                foreach ($emails as $existingEmail) {
                    if ($email === $existingEmail['email']) {
                        $alreadyExists = true;
                        echo "Email already registered. Please use a different email.";
                        break;
                    } else {
                        $alreadyExists = false;
                    }
                }
                
                if ($alreadyExists == true) {
                    echo "<script>emailAlert();</script>";
                    //exit; // Stop further execution
                } else {
                    $stmt = $pdo->prepare("INSERT INTO users (name, email, password, isAdmin) VALUES (?, ?, ?, ?)");
                
                    $stmt->execute([$name, $email, $password, $isAdmin]);
                    $_SESSION['username'] = $name;
                    $_SESSION['isAdmin'] = $isAdmin;
                    $_SESSION['email'] = $email;
                    echo "User " . htmlspecialchars($name) . " registered successfully.";
                }
                
            }
            
            ?>


    </main>



</body>
</html> 
