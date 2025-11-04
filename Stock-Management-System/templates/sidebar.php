
<nav>
<p>Navigation</p>
    <?php
    $pageName = basename($_SERVER['PHP_SELF']);
    if (!isset($_SESSION['username'])) {
        if ($pageName != 'prototype.php') {
            echo '<form action="prototype.php"><button class="redirectButton" id="redirect">Log-In</button></form>'; }
        if ($pageName != 'signUp.php') {
            echo '<form action="signUp.php"><button class="redirectButton" id="redirect">Sign-Up</button></form>'; }
    }?>

    <?php 
        
        if ($pageName != 'admin.php') {
            echo '<form action="admin.php"><button class="redirectButton" id="redirect">Admin Page</button></form>';
        };
        if ($pageName != 'weatherForecast.php') {
            echo '<form action="weatherForecast.php"><button class="redirectButton" id="redirect">Weather Forecast</button></form>';
        };
        if ($pageName != 'index.php') {
            echo '<form action="index.php"><button class="redirectButton" id="redirect">Home</button></form>';
        }
    
    ?>  

    

    <?php if (isset($_SESSION['username'])) {
        echo "<p class='welcome'>WELCOME BACK " . $_SESSION['username'] . "</p>";
        echo "<br><p class = 'welcome'>Your email is " . $_SESSION['email'] . "</p>";
        
    };
    ?>
    
</nav>
