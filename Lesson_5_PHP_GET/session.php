<?php
session_start();
if (isset($_GET['sessionName'])) {
    $name = $_GET['sessionName'];
    $_SESSION['username'] = $name;
    echo "Session set for " . $_SESSION['username'];
} else {
    $_SESSION['username'] = 'johnpork';
    echo "Session set for " . $_SESSION['username'];
}

?>