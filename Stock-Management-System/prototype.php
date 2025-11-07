<?php session_start(); ?>
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Layout Prototype</title>
    <link rel="stylesheet" href="assets/css/styles.css">
    <link rel="icon" type="image/x-icon" href="assets/images/logo.png">
</head>
<body>
    
    <?php $pageName = "Home Page";
    include("templates/header.php");
    include("templates/sidebar.php") ?>
    <main>
        
        <div class="loginBox">
            <p>

            </p><br>
            <?php
            if (isset($_SESSION['username'])) {
                console.log("logged in");
            } else {
                echo "Welcome new user.<br>";
                echo "<p>Log-In</p>
            
                <form action='process-login.php' method='post'><input type='text' placeholder='Enter user' name='user'><br><br>

                <input type='password' placeholder='Enter password' name='password'><br><br>

                <button id='submit'>Log-in</button></form>";
            };
            
            
            ?>
        </div>
        
    </main>



</body>
</html>