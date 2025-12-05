<?php
if (session_status() === PHP_SESSION_NONE) {
    session_start();
}
?>

<!-- Header -->
<header class="header">
    <div class="container header-inner">
        <div class="logo">ZOO</div>

        <?php if (isset($_SESSION['username'])): ?>
            <button class="login-btn" data-modal-target="#bookingsModal">Your Bookings</button>
            <?php if ($_SESSION['username'] === 'root@gmail.com'): ?>
                <button class="login-btn" style="background:var(--amber-600);" data-modal-target="#adminModal">Admin Panel</button>
            <?php endif; ?>
        <?php endif; ?>

        <nav class="desktop-nav">
            <a href="#home">Home</a>
            <a href="#animals">Animals</a>
            <a href="#visit">Visit</a>
            <a href="#hotel">Hotel</a>
            <a href="#loyalty">Loyalty</a>
        </nav>

        <div>
            <?php if (!isset($_SESSION['username'])): ?>
                    <button class="login-btn" data-modal-target="#loginModal">Login</button>
                <?php else: ?>
                    <span class="user-email" style="font-weight:600;"><?php echo htmlspecialchars($_SESSION['username']); ?></span>
                    <form method="POST" style="display:inline;margin:0;">
                        <button class="login-btn" name="logout">Logout</button>
                    </form>
                <?php endif; ?>
        </div>

        <button class="hamburger" aria-label="Open mobile menu">
            <span></span><span></span><span></span>
        </button>
    </div>

    <nav class="mobile-nav" id="mobileNav">
        <?php if (isset($_SESSION['username'])): ?>
            <button style="background:var(--green-600);color:white;padding:8px 12px;border-radius:4px;border:none;cursor:pointer;font-weight:600;width:100%;margin-bottom:8px;" data-modal-target="#bookingsModal">Your Bookings</button>
        <?php endif; ?>

        <a href="#home">Home</a>
        <a href="#animals">Animals</a>
        <a href="#visit">Visit</a>
        <a href="#hotel">Hotel</a>
        <a href="#loyalty">Loyalty</a>

        <?php if (!isset($_SESSION['username'])): ?>
            <a href="#" data-modal-target="#loginModal">Login</a>
        <?php else: ?>
            <div style="padding: 12px 16px; display:flex; gap:12px; align-items:center; flex-wrap:wrap;">
                <span style="font-weight:600; color:#333"><?php echo htmlspecialchars($_SESSION['username']); ?></span>
                <form method="POST" style="margin:0;">
                    <button style="background:none;border:none;color:#333;font-weight:600;" name="logout">Logout</button>
                </form>
            </div>
        <?php endif; ?>
    </nav>
</header>
