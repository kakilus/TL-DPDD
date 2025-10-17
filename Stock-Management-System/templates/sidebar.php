
<nav>
<p>Navigation</p>
    <?php
    if (!isset($_SESSION['username'])) {
        echo '<a href="prototype.php"><button class="redirectButton"  id="redirect">Log-In</button></a>';
        echo '<a href="signUp.php"><button class="redirectButton"  id="redirect">Sign-Up</button></a>';
    };
    ?>
    <a href="stockControl.php"><button class="redirectButton"  id="redirect">Stock Control</button></a>
    <a href="index.php"><button class="redirectButton"  id="redirect">Home</button></a>
</nav>