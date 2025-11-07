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
</head>
<body>
    
    <?php $pageName = "Home Page";
    include("templates/header.php");
    include("templates/sidebar.php") ?>

    <main>
        <?php
            $dsn = "sqlite:my_database.db";
            $pdo = new PDO($dsn);
            $stmt = $pdo->query("SELECT name, password, email, isAdmin FROM users");
            $names = $stmt->fetchAll(PDO::FETCH_ASSOC); // Get all rows as an associative array

            $loginSuccess = false;

            if (isset($_POST['user'], $_POST['password'])) {
                foreach ($names as $name) {
                    // Use password_verify to check hashed password
                    if (
                        $_POST['user'] === $name['name'] &&
                        password_verify($_POST['password'], $name['password'])
                    ) {
                        $isAdmin = $name['isAdmin'];
                        $user = htmlspecialchars($_POST['user']);
                        echo "hello " . $user;
                        $email = $name['email'];
                        $_SESSION['username'] = $user;
                        $_SESSION['email'] = $email;
                        $_SESSION['isAdmin'] = $isAdmin;
                        $loginSuccess = true;
                        break;
                    }
                }

                if (!$loginSuccess) {
                    echo "invalid login" . "<br><img src='assets/images/clash-royale-emote.gif'>";
                }
            }

            ?>


    </main>



</body>
</html>