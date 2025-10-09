<?php session_start(); ?>
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Layout Prototype</title>
    <link rel="stylesheet" href="assets/css/styles.css">
</head>
<body>
    
    <div class="logo"><img src="assets/images/clash-royale-emote.gif" alt="aaaaaa" class="img"></div>
    <?php $pageName = "Log-In Page";
    include("templates/header.php");
    
    //include("templates/footer.php");
    //include("templates/sidebar.php");
    ?>
    <nav><p>Navigation</p>
        <a href="index.php"><button class="redirectButton"  id="redirect">Home</button></a>
        <a href="stockControl.php"><button class="redirectButton"  id="redirect">Stock Control</button></a>
        <a href="admin.php"><button class="redirectButton"  id="redirect">Admin</button></a>
    </nav>
    <main>
        <div class="loginBox">
            <p>

            </p><br>
            <?php
            if (isset($_SESSION['username'])) {
                echo "WELCOME BACK " . $_SESSION['username'];
            } else {
                echo "Welcome new user.<br>";
                echo "<p>Log-In</p>
            
                <input type='text' placeholder='Enter user' id='username'><br><br>

                <input type='password' placeholder='Enter password' id='password'><br><br>

                <button id='submit'>Log-in</button>";
            };
            
            
            ?>
        </div>
        
    </main>



</body>
</html>