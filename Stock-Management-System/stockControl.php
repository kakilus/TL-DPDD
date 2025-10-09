<?php session_start(); ?>
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Home</title>
    <link rel="stylesheet" href="assets/css/styles.css">
</head>
<body>
    <div class="logo"><img src="assets/images/clash-royale-emote.gif" alt="aaaaaa" class="img"></div>
    <?php $pageName = "Stock Control Page";
    include("templates/header.php"); ?>
    <nav><p>Navigation</p>
        <a href="prototype.php"><button class="redirectButton"  id="redirect">Log-In</button></a>
        <a href="index.php"><button class="redirectButton"  id="redirect">Home</button></a>
        <a href="admin.php"><button class="redirectButton"  id="redirect">Admin</button></a>
    </nav>
    <main>
        
    </main>



</body>
</html>