
<nav>
<p>Navigation</p>
    <?php
    if (!isset($_SESSION['username'])) {
        echo '<a href="prototype.php"><button class="redirectButton"  id="redirect">Log-In</button></a>';
        echo '<a href="signUp.php"><button class="redirectButton"  id="redirect">Sign-Up</button></a>';
    }?>

    <?php 
        $pageName = basename($_SERVER['PHP_SELF']);
        if ($pageName != 'admin.php') {
            echo '<a href="admin.php"><button class="redirectButton"  id="redirect">Admin Page</button></a>';
        };
        if ($pageName != 'weatherForecast.php') {
            echo '<a href="weatherForecast.php"><button class="redirectButton"  id="redirect">Weather Forecast</button></a>';
        };
        if ($pageName != 'index.php') {
            echo '<a href="index.php"><button class="redirectButton"  id="redirect">Home</button></a>';
        }
    
    ?>  

    

    <?php if (isset($_SESSION['username'])) {
        echo "<p class='welcome'>WELCOME BACK " . $_SESSION['username'] . "</p>";
        echo "<br><p class = 'welcome'>Your email is " . $_SESSION['email'] . "</p>";
        
    };
    ?>
    
</nav>
