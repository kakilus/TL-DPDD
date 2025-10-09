<?php
if (isset($_GET['name'])) {
    $name = htmlspecialchars($_GET['name']);
    echo "Hello " . $name;
}
if (isset($_GET['game'])) {
    $game = htmlspecialchars($_GET['game']);
    echo "ur favourite game is " . $game;
}
?>