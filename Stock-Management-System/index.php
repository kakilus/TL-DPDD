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


    <?php $pageName = "Home Page";
    include("templates/header.php");
    include("templates/sidebar.php") ?>

    

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