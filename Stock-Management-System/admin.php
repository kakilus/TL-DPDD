<?php session_start(); ?>
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
            if (isset($_SESSION['username'])) {
                $isAdmin = $_SESSION['isAdmin'];
                if ($isAdmin == 1) {
                    echo "<p>Welcome, Admin!</p>";
                } else {
                    echo "<p>Admin access denied</p>";
                }
            }
            
            ?>
            
    </main>



</body>
</html> 