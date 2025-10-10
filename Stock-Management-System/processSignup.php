<?php 
session_start(); ?>



<!DOCTYPE html>

<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Home</title>
    <link rel="stylesheet" href="assets/css/styles.css">
    <script src='assets/js/emailRegistered.js'></script>
</head>
<body>
    <div class="logo"><img src="assets/images/clash-royale-emote.gif" alt="aaaaaa" class="img"></div>

    <?php $pageName = "Admin Page";
    include("templates/header.php"); ?>
    <nav><p>Navigation</p>
        
        <a href="stockControl.php"><button class="redirectButton"  id="redirect">Stock Control</button></a>
        <a href="index.php"><button class="redirectButton"  id="redirect">Home</button></a>
        <a href="admin.php"><button class="redirectButton"  id="redirect">Admin</button></a>
    </nav>
    <main>
        <?php
            $dsn = "sqlite:my_database.db";
            $pdo = new PDO($dsn);
            $query = $pdo->query("SELECT email FROM users");
            $emails = $query->fetchAll(PDO::FETCH_ASSOC);

            if (isset($_POST['user'], $_POST['password'], $_POST['email'])) {
                $name = $_POST['user'];
                $email = $_POST['email'];
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
                    $stmt = $pdo->prepare("INSERT INTO users (name, email, password) VALUES (?, ?, ?)");
                
                    $stmt->execute([$name, $email, $password]);
                    $_SESSION['username'] = $name;
                    echo "User " . htmlspecialchars($name) . " registered successfully.";
                }
                
            }
            
            ?>


    </main>



</body>
</html> 
