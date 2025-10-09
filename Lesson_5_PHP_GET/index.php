<?php
session_start();
if (isset($_SESSION['username'])) {
    echo "WELCOME BACK " . $_SESSION['username'];
} else {
    echo "Welcome new user.";
}
// use of get ?>

<form action="get-example.php" method="get"><input type="text" name="name" placeholder="Enter your name">
<button type="submit">Say hello</button>
</form>
<form action="get-example.php" method="get"><input type="text" name="game" placeholder="Enter your fav game">
<button type="submit">Submit</button>
</form>

<?php // use of post ?>

<form action="process-login.php" method="post"><input type="text" name="user" placeholder="Enter your username">
<input type="password" name="password" placeholder="Enter your password"><button type="submit">Submit</button>
</form>


<form action="session.php" method="get"><input type="text" name="sessionName" placeholder="Enter name for session">
<button type="submit">Say hello</button>
</form>