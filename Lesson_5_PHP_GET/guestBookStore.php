<?php
session_start();

if (isset($_SESSION['guestbook'])) {
    $array = $_SESSION['guestbook'];
    echo $array;
} else {
    $array = [
        "Name" => "Message",
    ];
};




//echo $_SESSION['guestbook'][$array]["name"];


if (isset($_POST['name']) && isset($_POST['msg'])) {
    $name = $_POST['name'];
    $msg = $_POST['msg'];
    array_push($array, $name);
    $array[$name] = $msg;
    $arrayLength = count($array);
    for ($index = 1; $index < $arrayLength;  $index ++) {
        echo $array[$index]. $array[$index].Value . "<br>";
    }
    $_SESSION['guestbook'] = $array;
}
