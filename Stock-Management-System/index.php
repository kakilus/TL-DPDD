<?php session_start(); ?>
<!DOCTYPE html>
<html lang="en">
<head>
     
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Home</title>
    <script src="assets/js/redirect.js"></script>
    <script src="assets/js/presentInfo.js"></script>
    <link rel="stylesheet" href="assets/css/styles.css">

</head>
<body>

    <div class="logo"><img src="assets/images/clash-royale-emote.gif" alt="aaaaaa" class="img"></div>

    <?php $pageName = "Home Page";
    include("templates/header.php"); ?>

    <nav><p>Navigation</p>
        <?php
        if (!isset($_SESSION['username'])) {
            echo '<a href="prototype.php"><button class="redirectButton"  id="redirect">Log-In</button></a>';
            echo '<a href="signUp.php"><button class="redirectButton"  id="redirect">Sign-Up</button></a>';
        };
        ?>
        <a href="stockControl.php"><button class="redirectButton"  id="redirect">Stock Control</button></a>
        <a href="admin.php"><button class="redirectButton"  id="redirect">Admin</button></a>
            
    </nav>

    <main>
        <?php
            if (isset($_SESSION['username'])) {
                echo "WELCOME BACK " . $_SESSION['username'];
                echo "<br>Your email is " . $_SESSION['email'];
            } 
        include("templates/viewBox.php");
        
        ?>
    </main>



</body>
</html>