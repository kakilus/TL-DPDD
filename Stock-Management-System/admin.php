<?php session_start(); ?>
<!DOCTYPE html>

<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Home</title>
    <link rel="stylesheet" href="assets/css/styles.css">
</head>
<body>
    

    <?php $pageName = "Home Page";
    include("templates/header.php");
    include("templates/sidebar.php") ?>
    
    <main>
        <?php
            if (isset($_SESSION['username'])) {
                echo "WELCOME BACK " . $_SESSION['username'];
            } ?>
            <img src="assets/images/monkey-jetpack.gif" class="img">
    </main>



</body>
</html> 