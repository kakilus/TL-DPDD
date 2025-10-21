<?php 
include("../config.php");
$pgName = basename($_SERVER['PHP_SELF']);
if ($pgName == 'admin.php') {
    $name = 'Admin Page';
};
if ($pgName == 'stockControl.php') {
    $name = 'Stock Control';
};
if ($pgName == 'index.php') {
    $name = 'Home';
};
if ($pgName == 'prototype.php') {
    $name = 'Sign-In Page';
};
if ($pgName == 'signUp.php') {
    $name = 'Sign-Up Page';
};
echo '<div class="logo"><img src="assets/images/clash-royale-emote.gif" alt="aaaaaa" class="img"></div>';
echo "<header>" . $name . "</header>";
?>
