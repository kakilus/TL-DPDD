<?php 
include("../config.php");
$pgName = basename($_SERVER['PHP_SELF']);
if ($pgName == 'admin.php') {
    $name = 'Admin Page';
};
if ($pgName == 'weatherForecast.php') {
    $name = 'Weather Forecast Page';
};
if ($pgName == 'index.php') {
    $name = 'Home Page';
};
if ($pgName == 'prototype.php') {
    $name = 'Sign-In Page';
};
if ($pgName == 'signUp.php') {
    $name = 'Sign-Up Page';
};
echo '<div class="logo"><img src="assets/images/logo.png" alt="aaaaaa" class="img"></div>';
echo "<header>" . $name . "</header>";
?>
