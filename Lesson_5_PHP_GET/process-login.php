<?php 
session_start();
if ($_POST['user'] == 'john_pork' && $_POST['password'] == 'password') {
    $user = htmlspecialchars($_POST['user']);
    echo "hello " . $user;
    $_SESSION['username'] = $user;
} else {
    echo "invalid login" . "<br><img src='img/clash-royale-emote.gif'>";
} ?>

<button ><a href="loginActivity.php">go back to activity?</a></button>