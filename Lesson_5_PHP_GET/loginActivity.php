<?php

session_start();
if (isset($_SESSION['username'])) {
    echo "WELCOME BACK " . $_SESSION['username'];
} else {
    echo "Welcome new user.<br>";
    echo "<form action='process-login.php' method='post'><input type='text' name='user' placeholder='Enter your username'><input type='password' name='password' placeholder='Enter your password'><button type='submit'>Submit</button></form>";
};
?>







