<?php
session_start();
session_unset();   // remove all session variables
session_destroy(); // destroy the session

echo "You have been logged out. <a href='login.html'>Login again</a>";
?>