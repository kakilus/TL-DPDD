<?php
session_start();

// connect to sqlite database
try {
    $db = new PDO('sqlite:zoo.db');
    $db->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
} catch (Exception $e) {
    // fatal for our app — show a brief message
    die('Database error: ' . htmlspecialchars($e->getMessage()));
}

/* =======================
   FETCH USER BOOKINGS 
======================== */
if ($_SERVER['REQUEST_METHOD'] === 'GET' && isset($_GET['fetch_bookings'])) {
    header('Content-Type: application/json');
    
    // Check user is logged in
    if (!isset($_SESSION['user_id'])) {
        echo json_encode(['success' => false, 'error' => 'User not logged in']);
        exit;
    }

    $user_id = $_SESSION['user_id'];

    try {
        // Fetch user info
        $userStmt = $db->prepare('SELECT name, email, phone FROM users WHERE id = ?');
        $userStmt->execute([$user_id]);
        $userInfo = $userStmt->fetch(PDO::FETCH_ASSOC);

        // Fetch loyalty membership
        $loyaltyStmt = $db->prepare('SELECT * FROM loyalty_memberships WHERE user_id = ? ORDER BY created_at DESC LIMIT 1');
        $loyaltyStmt->execute([$user_id]);
        $loyalty = $loyaltyStmt->fetch(PDO::FETCH_ASSOC);

        // Fetch hotel bookings
        $hotelStmt = $db->prepare('SELECT * FROM hotel_bookings WHERE user_id = ? ORDER BY created_at DESC');
        $hotelStmt->execute([$user_id]);
        $hotels = $hotelStmt->fetchAll(PDO::FETCH_ASSOC);

        // Fetch visit bookings
        $visitStmt = $db->prepare('SELECT * FROM visit_bookings WHERE user_id = ? ORDER BY created_at DESC');
        $visitStmt->execute([$user_id]);
        $visits = $visitStmt->fetchAll(PDO::FETCH_ASSOC);

        echo json_encode([
            'success' => true,
            'user' => $userInfo,
            'loyalty' => $loyalty,
            'hotels' => $hotels,
            'visits' => $visits
        ]);
    } catch (Exception $e) {
        echo json_encode(['success' => false, 'error' => 'Database error: ' . $e->getMessage()]);
    }
    exit;
}


/* =======================
   LOGOUT
======================== */
if (isset($_POST['logout'])) {
    unset($_SESSION['username'], $_SESSION['user_id']);
    session_destroy();
    header("Location: index.php");
    exit;
}

/* =======================
   SIGNUP
======================== */
if ($_SERVER['REQUEST_METHOD'] === 'POST' && isset($_POST['signupEmail'])) {
    $name = trim($_POST['signupName'] ?? '');
    $email = trim($_POST['signupEmail']);
    $password = $_POST['signupPassword'] ?? '';
    $phone = trim($_POST['signupPhone'] ?? '');

    // basic validations: password length and email contains @ and .
    if (strlen($password) < 8) {
        $_SESSION['auth_error'] = 'Password must be at least 8 characters.';
        header('Location: index.php');
        exit;
    }

    if (strpos($email, '@') === false || strpos($email, '.') === false) {
        $_SESSION['auth_error'] = 'Please enter a valid email address.';
        header('Location: index.php');
        exit;
    }

    // check duplicate
    $stmt = $db->prepare('SELECT id FROM users WHERE email = ?');
    $stmt->execute([$email]);
    if ($stmt->fetch()) {
        $_SESSION['auth_error'] = 'An account with that email already exists.';
        header('Location: index.php');
        exit;
    }

    // validate phone (digits only, reasonable length)
    $phoneDigits = preg_replace('/\D+/', '', $phone);
    if (strlen($phoneDigits) < 7 || strlen($phoneDigits) > 15) {
        $_SESSION['auth_error'] = 'Please enter a valid phone number (7 to 15 digits).';
        header('Location: index.php');
        exit;
    }

    // insert user
    $hash = password_hash($password, PASSWORD_DEFAULT);
    $ins = $db->prepare('INSERT INTO users (name, email, password_hash, phone) VALUES (?, ?, ?, ?)');
    $ins->execute([$name, $email, $hash, $phone]);

    $_SESSION['username'] = $email;
    $_SESSION['user_id'] = $db->lastInsertId();

    header('Location: index.php');
    exit;
}

/* =======================
   LOGIN
======================== */
if ($_SERVER['REQUEST_METHOD'] === 'POST' && isset($_POST['loginEmail'])) {
    $email = trim($_POST['loginEmail']);
    $password = $_POST['loginPassword'] ?? '';

    $stmt = $db->prepare('SELECT id, password_hash FROM users WHERE email = ?');
    $stmt->execute([$email]);
    $row = $stmt->fetch(PDO::FETCH_ASSOC);

    if (!$row || !password_verify($password, $row['password_hash'])) {
        $_SESSION['auth_error'] = 'Invalid email or password.';
        header('Location: index.php');
        exit;
    }

    // success
    $_SESSION['username'] = $email;
    $_SESSION['user_id'] = $row['id'];

    header('Location: index.php');
    exit;
}

/* =======================
   STORE HOTEL BOOKING
======================== */
if ($_SERVER['REQUEST_METHOD'] === 'POST' && isset($_POST['store_hotel_booking'])) {
    header('Content-Type: application/json');
    
    // Check user is logged in
    if (!isset($_SESSION['user_id'])) {
        echo json_encode(['success' => false, 'error' => 'User not logged in']);
        exit;
    }

    $user_id = $_SESSION['user_id'];
    $hotel_name = trim($_POST['hotel_name'] ?? '');
    $adults = intval($_POST['adults'] ?? 0);
    $children = intval($_POST['children'] ?? 0);
    $check_in = trim($_POST['check_in'] ?? '');
    $check_out = trim($_POST['check_out'] ?? '');
    $guest_name = trim($_POST['guest_name'] ?? '');
    $guest_email = trim($_POST['guest_email'] ?? '');
    $guest_phone = trim($_POST['guest_phone'] ?? '');
    $total_price = floatval($_POST['total_price'] ?? 0);
    $nights = intval($_POST['nights'] ?? 0);
    $payment_method = trim($_POST['payment_method'] ?? 'card');

    // Validate required fields
    $errors = [];
    if (empty($hotel_name)) $errors[] = 'Hotel name is required';
    if ($adults < 1) $errors[] = 'At least 1 adult is required';
    if (empty($check_in)) $errors[] = 'Check-in date is required';
    if (empty($check_out)) $errors[] = 'Check-out date is required';
    if (empty($guest_name)) $errors[] = 'Guest name is required';
    if (empty($guest_email)) $errors[] = 'Guest email is required';
    if (empty($guest_phone)) $errors[] = 'Guest phone is required';
    if ($total_price <= 0) $errors[] = 'Invalid price';
    if ($nights < 1) $errors[] = 'Invalid number of nights';

    if (!empty($errors)) {
        echo json_encode(['success' => false, 'error' => implode(', ', $errors)]);
        exit;
    }

    try {
        $stmt = $db->prepare('INSERT INTO hotel_bookings 
            (user_id, hotel_name, adults, children, check_in, check_out, guest_name, guest_email, guest_phone, total_price, nights, payment_method) 
            VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)');
        
        $stmt->execute([
            $user_id, $hotel_name, $adults, $children, $check_in, $check_out,
            $guest_name, $guest_email, $guest_phone, $total_price, $nights, $payment_method
        ]);

        echo json_encode(['success' => true, 'booking_id' => $db->lastInsertId()]);
    } catch (Exception $e) {
        echo json_encode(['success' => false, 'error' => 'Database error: ' . $e->getMessage()]);
    }
    exit;
}

/* =======================
   STORE ZOO VISIT BOOKING
======================== */
if ($_SERVER['REQUEST_METHOD'] === 'POST' && isset($_POST['store_visit_booking'])) {
    header('Content-Type: application/json');
    
    // Check user is logged in
    if (!isset($_SESSION['user_id'])) {
        echo json_encode(['success' => false, 'error' => 'User not logged in']);
        exit;
    }

    $user_id = $_SESSION['user_id'];
    $visit_date = trim($_POST['visit_date'] ?? '');
    $visit_time = trim($_POST['visit_time'] ?? '');
    $adults = intval($_POST['adults'] ?? 0);
    $children = intval($_POST['children'] ?? 0);
    $seniors = intval($_POST['seniors'] ?? 0);
    $total_price = floatval($_POST['total_price'] ?? 0);
    $payment_method = trim($_POST['payment_method'] ?? 'card');

    // Validate required fields
    $errors = [];
    if (empty($visit_date)) $errors[] = 'Visit date is required';
    if (empty($visit_time)) $errors[] = 'Visit time is required';
    if (($adults + $children + $seniors) < 1) $errors[] = 'At least 1 visitor is required';
    if ($total_price <= 0) $errors[] = 'Invalid price';

    if (!empty($errors)) {
        echo json_encode(['success' => false, 'error' => implode(', ', $errors)]);
        exit;
    }

    try {
        $stmt = $db->prepare('INSERT INTO visit_bookings 
            (user_id, visit_date, visit_time, adults, children, seniors, total_price, payment_method) 
            VALUES (?, ?, ?, ?, ?, ?, ?, ?)');
        
        $stmt->execute([
            $user_id, $visit_date, $visit_time, $adults, $children, $seniors, $total_price, $payment_method
        ]);

        echo json_encode(['success' => true, 'booking_id' => $db->lastInsertId()]);
    } catch (Exception $e) {
        echo json_encode(['success' => false, 'error' => 'Database error: ' . $e->getMessage()]);
    }
    exit;
}

/* =======================
   STORE LOYALTY MEMBERSHIP
======================== */
if ($_SERVER['REQUEST_METHOD'] === 'POST' && isset($_POST['store_loyalty_membership'])) {
    header('Content-Type: application/json');
    
    // Check user is logged in
    if (!isset($_SESSION['user_id'])) {
        echo json_encode(['success' => false, 'error' => 'User not logged in']);
        exit;
    }

    $user_id = $_SESSION['user_id'];
    $tier = trim($_POST['tier'] ?? '');
    $total_price = floatval($_POST['total_price'] ?? 0);
    $payment_method = trim($_POST['payment_method'] ?? 'card');

    // Validate required fields
    $errors = [];
    if (empty($tier)) $errors[] = 'Tier is required';
    if (!in_array($tier, ['Bronze', 'Silver', 'Gold'])) $errors[] = 'Invalid tier';
    if ($total_price < 0) $errors[] = 'Invalid price';

    if (!empty($errors)) {
        echo json_encode(['success' => false, 'error' => implode(', ', $errors)]);
        exit;
    }

    try {
        // Deactivate any existing membership to be able to upgrade/downgrade
        $updateStmt = $db->prepare('UPDATE loyalty_memberships SET active = 0 WHERE user_id = ? AND active = 1');
        $updateStmt->execute([$user_id]);

        $start_date = date('Y-m-d');
        $expires_date = null;
        
        // Set expiry dates
        if ($tier !== 'Bronze') {
            $expires_date = date('Y-m-d', strtotime('+1 year'));
        }

        // Create new membership
        $stmt = $db->prepare('INSERT INTO loyalty_memberships 
            (user_id, tier, start_date, expires_date, total_price, payment_method) 
            VALUES (?, ?, ?, ?, ?, ?)');
        
        $stmt->execute([
            $user_id, $tier, $start_date, $expires_date, $total_price, $payment_method
        ]);

        echo json_encode(['success' => true, 'membership_id' => $db->lastInsertId()]);
    } catch (Exception $e) {
        echo json_encode(['success' => false, 'error' => 'Database error: ' . $e->getMessage()]);
    }
    exit;
}

/* =======================
   ADMIN: CHECK IF USER IS ADMIN
======================== */
function isAdmin() {
    return isset($_SESSION['username']) && $_SESSION['username'] === 'root@gmail.com';
}

/* =======================
   ADMIN: FETCH ALL BOOKINGS
======================== */
if ($_SERVER['REQUEST_METHOD'] === 'GET' && isset($_GET['admin_fetch_bookings'])) {
    header('Content-Type: application/json');
    
    if (!isAdmin()) {
        echo json_encode(['success' => false, 'error' => 'Unauthorized']);
        exit;
    }

    try {
        // Fetch all hotel bookings with user info
        $hotelStmt = $db->prepare('SELECT h.*, u.email, u.name FROM hotel_bookings h JOIN users u ON h.user_id = u.id ORDER BY h.created_at DESC');
        $hotelStmt->execute();
        $hotels = $hotelStmt->fetchAll(PDO::FETCH_ASSOC);

        // Fetch all visit bookings with user info
        $visitStmt = $db->prepare('SELECT v.*, u.email, u.name FROM visit_bookings v JOIN users u ON v.user_id = u.id ORDER BY v.created_at DESC');
        $visitStmt->execute();
        $visits = $visitStmt->fetchAll(PDO::FETCH_ASSOC);

        echo json_encode(['success' => true, 'hotels' => $hotels, 'visits' => $visits]);
    } catch (Exception $e) {
        echo json_encode(['success' => false, 'error' => 'Database error']);
    }
    exit;
}

/* =======================
   ADMIN: FETCH VOLUME & REVENUE DATA
======================== */
if ($_SERVER['REQUEST_METHOD'] === 'GET' && isset($_GET['admin_fetch_stats'])) {
    header('Content-Type: application/json');
    
    if (!isAdmin()) {
        echo json_encode(['success' => false, 'error' => 'Unauthorized']);
        exit;
    }

    try {
        $currentMonth = date('Y-m');
        
        // Volume: count bookings per day this month
        $volumeStmt = $db->prepare('
            SELECT DATE(created_at) as day, COUNT(*) as count
            FROM (
                SELECT created_at FROM hotel_bookings WHERE strftime("%Y-%m", created_at) = ?
                UNION ALL
                SELECT created_at FROM visit_bookings WHERE strftime("%Y-%m", created_at) = ?
            )
            GROUP BY day
            ORDER BY day
        ');
        $volumeStmt->execute([$currentMonth, $currentMonth]);
        $volumeData = $volumeStmt->fetchAll(PDO::FETCH_ASSOC);

        // Revenue: sum totals per day this month
        $revenueStmt = $db->prepare('
            SELECT DATE(created_at) as day, SUM(total_price) as revenue
            FROM (
                SELECT created_at, total_price FROM hotel_bookings WHERE strftime("%Y-%m", created_at) = ?
                UNION ALL
                SELECT created_at, total_price FROM visit_bookings WHERE strftime("%Y-%m", created_at) = ?
            )
            GROUP BY day
            ORDER BY day
        ');
        $revenueStmt->execute([$currentMonth, $currentMonth]);
        $revenueData = $revenueStmt->fetchAll(PDO::FETCH_ASSOC);

        echo json_encode(['success' => true, 'volume' => $volumeData, 'revenue' => $revenueData]);
    } catch (Exception $e) {
        echo json_encode(['success' => false, 'error' => 'Database error']);
    }
    exit;
}

/* =======================
   ADMIN: DELETE BOOKING
======================== */
if ($_SERVER['REQUEST_METHOD'] === 'POST' && isset($_POST['admin_delete_booking'])) {
    header('Content-Type: application/json');
    
    if (!isAdmin()) {
        echo json_encode(['success' => false, 'error' => 'Unauthorized']);
        exit;
    }

    $bookingType = trim($_POST['type'] ?? '');
    $bookingId = intval($_POST['id'] ?? 0);

    if ($bookingType === 'hotel') {
        try {
            $stmt = $db->prepare('DELETE FROM hotel_bookings WHERE id = ?');
            $stmt->execute([$bookingId]);
            echo json_encode(['success' => true, 'message' => 'Hotel booking deleted']);
        } catch (Exception $e) {
            echo json_encode(['success' => false, 'error' => 'Database error']);
        }
    } elseif ($bookingType === 'visit') {
        try {
            $stmt = $db->prepare('DELETE FROM visit_bookings WHERE id = ?');
            $stmt->execute([$bookingId]);
            echo json_encode(['success' => true, 'message' => 'Visit booking deleted']);
        } catch (Exception $e) {
            echo json_encode(['success' => false, 'error' => 'Database error']);
        }
    } else {
        echo json_encode(['success' => false, 'error' => 'Invalid booking type']);
    }
    exit;
}
?>
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Riget Zoo Adventures</title>
    <link rel="stylesheet" href="assets/css/styles.css">
    <!-- PayPal SDK API -->
    <script src="https://www.paypal.com/sdk/js?client-id=sb&currency=GBP"></script>
    <!-- Chart.js for admin graphs -->
    <script src="https://cdn.jsdelivr.net/npm/chart.js@3.9.1/dist/chart.min.js"></script>
    <script>
        const isLoggedIn = <?php echo isset($_SESSION['username']) ? 'true' : 'false'; ?>;
    </script>
</head>
<body>

<!-- ================= HEADER ================= -->
<?php include("templates/header.php"); ?>

<!-- ================= HERO ================= -->
<?php include("templates/hero.php"); ?>

<!-- ================= ANIMALS ================= -->
<?php include("templates/animals.php"); ?>

<!-- ================= PLAN YOUR VISIT ================= -->
<?php include("templates/visit.php"); ?>

<!-- ================= HOTEL SECTION ================= -->
<?php include("templates/hotel.php"); ?>

<!-- ================= LOYALTY PROGRAM ================= -->
<?php include("templates/loyalty.php"); ?>

<!-- ================= FOOTER ================= -->
<?php include("templates/footer.php"); ?>

<!-- ================= MODALS ================= -->
<?php include("templates/modals.php"); ?>

<script src="assets/js/script.js"></script>
</body>
</html>
