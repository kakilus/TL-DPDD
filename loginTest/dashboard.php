<?php
session_start();

if (!isset($_SESSION["userID"])) {
    header("Location: login.html");
    exit();
}

echo "Welcome, " . htmlspecialchars($_SESSION["userName"]) . "! <br>";
echo "<a href='logout.php'>Logout</a>";
?>