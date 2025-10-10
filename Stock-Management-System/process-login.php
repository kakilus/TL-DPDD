<?php 
session_start(); ?>



<!DOCTYPE html>

<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Home</title>
    <link rel="stylesheet" href="assets/css/styles.css">
</head>
<body>
    <div class="logo"><img src="assets/images/clash-royale-emote.gif" alt="aaaaaa" class="img"></div>

    <?php $pageName = "Admin Page";
    include("templates/header.php"); ?>
    <nav><p>Navigation</p>
        <a href="prototype.php"><button class="redirectButton"  id="redirect">Log-In</button></a>
        <a href="stockControl.php"><button class="redirectButton"  id="redirect">Stock Control</button></a>
        <a href="index.php"><button class="redirectButton"  id="redirect">Home</button></a>
        <a href="admin.php"><button class="redirectButton"  id="redirect">Admin</button></a>
    </nav>
    <main>
        <?php
            $dsn = "sqlite:my_database.db";
            $pdo = new PDO($dsn);
            $stmt = $pdo->query("SELECT name, password FROM users");
            $names = $stmt->fetchAll(PDO::FETCH_ASSOC); // Get all rows as an associative array

            $loginSuccess = false; // 1. Add a flag

            if (isset($_POST['user'], $_POST['password'])) {
                foreach ($names as $name) {
                    if ($_POST['user'] === $name['name'] && $_POST['password'] === $name['password']) {
                        $user = htmlspecialchars($_POST['user']);
                        echo "hello " . $user;
                        $_SESSION['username'] = $user;
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
<button ><a href="prototype.php">try again?</a></button>