<!-- Login Modal -->
<div class="modal" id="loginModal" aria-hidden="true">
    <div class="modal-content">
        <span class="close" data-close>&times;</span>
        <h2>Login</h2>
        <?php if (session_status() === PHP_SESSION_NONE) { session_start(); } ?>
        <?php if (!empty($_SESSION['auth_error'])): $auth_msg = $_SESSION['auth_error']; unset($_SESSION['auth_error']); ?>
            <p class="auth-error"><?php echo htmlspecialchars($auth_msg); ?></p>
            <script>
                window.__authError = <?php echo json_encode($auth_msg); ?>;
            </script>
        <?php endif; ?>

        <form id="loginForm" method="POST">
            <label for="loginEmail">Email</label>
            <input type="email" name="loginEmail" id="loginEmail" required>

            <label for="loginPassword">Password</label>
            <input type="password" name="loginPassword" id="loginPassword" required>

            <button type="submit" class="btn primary">Login</button>
        </form>

        <p>Don't have an account? <a href="#" data-switch="#signupModal">Sign Up</a></p>
    </div>
</div>

<!-- Signup Modal -->
<div class="modal" id="signupModal" aria-hidden="true">
    <div class="modal-content">
        <span class="close" data-close>&times;</span>
        <h2>Sign Up</h2>
        <?php if (session_status() === PHP_SESSION_NONE) { session_start(); } ?>
        <?php if (!empty($_SESSION['auth_error'])): $auth_msg = $_SESSION['auth_error']; unset($_SESSION['auth_error']); ?>
            <p class="auth-error"><?php echo htmlspecialchars($auth_msg); ?></p>
            <script>
                window.__authError = <?php echo json_encode($auth_msg); ?>;
            </script>
        <?php endif; ?>

        <form id="signupForm" method="POST">
            <label for="signupName">Full Name</label>
            <input type="text" id="signupName" name="signupName" required>

            <label for="signupEmail">Email</label>
            <input type="email" id="signupEmail" name="signupEmail" required>

            <label for="signupPhone">Phone</label>
            <input type="tel" id="signupPhone" name="signupPhone" required placeholder="e.g. +441234567890" maxlength="20">

            <label for="signupPassword">Password</label>
            <input type="password" id="signupPassword" name="signupPassword" required>

            <button type="submit" class="btn primary">Sign Up</button>
        </form>

        <p>Already have an account? <a href="#" data-switch="#loginModal">Login</a></p>
    </div>
</div>

<!-- Visitor Numbers -->
<div id="visitDetailsModal" class="modal">
    <div class="modal-content">
        <span class="close" data-close>&times;</span>
        <h2>Visitor Numbers</h2>

        <form id="visitDetailsForm">
            <label for="visitAdults">Adults (£29.99 each)</label>
            <input type="number" id="visitAdults" placeholder="Adults" value="1" min="0" class="btn full" style="margin-bottom:12px;">

            <label for="visitChildren">Children 3-12 (£19.99 each)</label>
            <input type="number" id="visitChildren" placeholder="Children" value="0" min="0" class="btn full" style="margin-bottom:12px;">

            <label for="visitSeniors">Seniors 65+ (£24.99 each)</label>
            <input type="number" id="visitSeniors" placeholder="Seniors" value="0" min="0" class="btn full" style="margin-bottom:12px;">

            <div id="visitPriceBreakdown" style="background:#f0f0f0;padding:12px;border-radius:6px;margin-bottom:12px;">
                <p id="visitPriceDisplay" style="font-weight:bold;">Total: £29.99</p>
            </div>

            <button class="btn primary full" type="submit">Proceed to Payment</button>
        </form>
    </div>
</div>

<!-- Visit Confirmation -->
<div id="visitConfirmModal" class="modal">
    <div class="modal-content">
        <span class="close" data-close>&times;</span>
        <h2>Visit Booked!</h2>
        <div id="visitConfirmDetails"></div>
    </div>
</div>

<!-- Booking Modal -->
<div class="modal" id="bookingModal" aria-hidden="true">
    <div class="modal-content">
        <span class="close" data-close>&times;</span>
        <h2>Hotel Booking</h2>
        <form id="bookingStartForm">
            <label for="hotelSelect">Select Hotel</label>
            <select id="hotelSelect" required>
                <option value="Safari Lodge" data-price="99">Safari Lodge (£99 per night per person)</option>
                <option value="Rainforest Retreat" data-price="129">Rainforest Retreat (£129 per night per person)</option>
                <option value="Wildlife Inn" data-price="69">Wildlife Inn (£69 per night per person)</option>
            </select>

            <label for="numAdults" style="margin-top:12px;">Adults</label>
            <input type="number" id="numAdults" value="1" min="1">

            <label for="numChildren">Children</label>
            <input type="number" id="numChildren" value="0" min="0">

            <button type="button" class="btn primary" data-modal-target="#calendarModal">Choose Dates</button>
        </form>
    </div>
</div>

<!-- Calendar Modal -->
<div class="modal" id="calendarModal" aria-hidden="true">
    <div class="modal-content">
        <span class="close" data-close>&times;</span>
        <h2>Select Your Stay</h2>

        <div class="calendar-container" id="calendarContainer"></div>

        <button type="button" class="btn primary" id="calendarNextBtn">Continue to Visitor Info</button>
    </div>
</div>

<!-- Visitor Info -->
<div class="modal" id="visitorModal" aria-hidden="true">
    <div class="modal-content">
        <span class="close" data-close>&times;</span>
        <h2>Visitor Information</h2>

        <form id="visitorForm">
            <label for="visitorEmail">Email</label>
            <input type="email" id="visitorEmail" required disabled>

            <label for="visitorPhone">Phone</label>
            <input type="tel" id="visitorPhone" required disabled>

            <label for="visitorNotes">Notes (optional)</label>
            <textarea id="visitorNotes"></textarea>

            <button type="button" class="btn primary" id="visitorNextBtn">Proceed to Payment</button>
        </form>
    </div>
</div>

<!-- Payment Modal -->
<div class="modal" id="paymentModal" aria-hidden="true">
    <div class="modal-content">
        <span class="close" data-close>&times;</span>
        <h2>Payment</h2>

        <!-- Price Summary -->
        <div id="paymentPriceSummary" style="background:#f0f0f0;padding:12px;border-radius:6px;margin-bottom:12px;">
            <p id="paymentPriceDisplay" style="font-weight:bold;font-size:1.2rem;">Total: £0.00</p>
        </div>

        <!-- Card Payment Section -->
        <form id="paymentForm">
            <label for="cardNumber">Card Number</label>
            <input type="text" id="cardNumber" maxlength="16" required>

            <label for="cardExpiry">Expiry Date</label>
            <input type="text" id="cardExpiry" placeholder="MM/YY" required>

            <label for="cardCVC">CVC</label>
            <input type="text" id="cardCVC" maxlength="3" required>

            <button type="submit" class="btn primary full">Pay with Card</button>
        </form>

        <!-- OR Divider -->
        <div style="display:flex;align-items:center;margin:20px 0;gap:10px;">
            <div style="flex:1;height:1px;background:#ccc;"></div>
            <span style="color:#666;font-weight:bold;">OR</span>
            <div style="flex:1;height:1px;background:#ccc;"></div>
        </div>

        <!-- PayPal Section -->
        <div id="paypalPaymentButtons" style="margin-top:12px;"></div>
    </div>
</div>

<!-- Confirmation Modal -->
<div class="modal" id="confirmationModal" aria-hidden="true">
    <div class="modal-content">
        <span class="close" data-close>&times;</span>
        <h2>Booking Confirmed!</h2>
        <div id="confirmationDetails"></div>
        <button class="btn primary" data-close>Done</button>
    </div>
</div>


<!-- Visit Date Picker -->
<div id="visitBookingCalendar" class="modal">
    <div class="modal-content">
        <span class="close" data-close>&times;</span>
        <h2>Select Visit Date</h2>

        <div id="visitCalendarContainer"></div>

        <button class="btn primary full" id="visitDateNextBtn">Next</button>
    </div>
</div>

<!-- Visit Time Modal -->
<div id="visitTimeModal" class="modal">
    <div class="modal-content">
        <span class="close" data-close>&times;</span>
        <h2>Select Entry Time</h2>

        <select id="visitTimeSelect" class="btn full" style="margin: 15px 0; padding: 12px;">
            <option value="">Select a time...</option>
        </select>

        <button class="btn primary full" id="visitTimeNextBtn">Next</button>
    </div>
</div>


<!-- LOYALTY JOIN MODALS -->
<div id="loyaltyDetailsModal" class="modal">
    <div class="modal-content">
        <span class="close" data-close>&times;</span>
        <h2>Join Loyalty Program</h2>

        <p id="loyaltyTierSelected" style="font-weight:bold;margin-bottom:10px;"></p>

        <?php if (session_status() === PHP_SESSION_NONE) { session_start(); } ?>
        <?php $logged_email = $_SESSION['username'] ?? ''; ?>
        <form id="loyaltyDetailsForm">
            <?php if (!empty($logged_email)): ?>
                <p style="margin-bottom:12px;">You're signed in as <strong><?php echo htmlspecialchars($logged_email); ?></strong></p>
                <input type="hidden" id="loyaltyName" value="" />
                <input type="hidden" id="loyaltyEmail" value="<?php echo htmlspecialchars($logged_email); ?>" />
                <button class="btn primary full" type="submit">Continue</button>
            <?php else: ?>
                <input type="text" id="loyaltyName" placeholder="Your Name" required class="btn full" style="margin-bottom:12px;">
                <input type="email" id="loyaltyEmail" placeholder="Your Email" required class="btn full" style="margin-bottom:12px;">
                <button class="btn primary full" type="submit">Continue</button>
            <?php endif; ?>
        </form>
    </div>
</div>

<div id="loyaltyPaymentModal" class="modal">
    <div class="modal-content">
        <span class="close" data-close>&times;</span>
        <h2>Membership Payment</h2>

        <p id="loyaltyPaymentAmount" style="margin-bottom:15px;"></p>

        <!-- PayPal buttons will render here for loyalty payments -->
        <div id="paypalLoyaltyButtons" style="margin-top:12px;"></div>
    </div>
</div>


<!-- Discover Species Modal -->
<div id="discoverSpeciesModal" class="modal">
    <div class="modal-content" style="max-width:600px;">
        <span class="close" data-close>&times;</span>
        <h2>Discover Species</h2>
        <div style="display:flex;justify-content:center;padding:20px 0;">
            <iframe width="110" height="200" src="https://www.myinstants.com/instant/fart-with-reverb-17715/embed/" frameborder="0" scrolling="no"></iframe>
            <iframe width="110" height="200" src="https://www.myinstants.com/instant/pluh-38652/embed/" frameborder="0" scrolling="no"></iframe>
        </div>
    </div>
</div>

<!-- Footer WIP Modal -->
<div id="footerWipModal" class="modal">
    <div class="modal-content">
        <span class="close" data-close>&times;</span>
        <h2>Coming Soon</h2>
        <p>This feature is a work in progress and not yet implemented.</p>
    </div>
</div>

<!-- YOUR BOOKINGS MODAL -->
<div id="bookingsModal" class="modal">
    <div class="modal-content">
        <span class="close" data-close>&times;</span>
        <h2>Your Bookings</h2>

        <div id="bookingsContainer" style="max-height:70vh;overflow-y:auto;">
            <p style="text-align:center;color:#666;">Loading your bookings...</p>
        </div>
    </div>
</div>

<!-- BOOKING DETAILS MODAL  -->
<div id="bookingDetailsModal" class="modal">
    <div class="modal-content">
        <span class="close" data-close>&times;</span>
        <h2 id="detailsModalTitle">Booking Details</h2>
        
        <div id="detailsContent" style="padding:12px 0;">
        </div>
    </div>
</div>

<!-- Cookie Consent Banner -->
<div id="cookieConsent" class="cookie-consent" aria-live="polite" style="display:none;">
    <div class="cookie-inner container">
        <p style="margin:0;">We use cookies to improve your experience. Read our <a href="#" id="cookiePolicyLink">Cookie Policy</a>.</p>

        <div class="cookie-actions">
            <button id="acceptNecessaryBtn" class="btn secondary">Accept Necessary</button>
            <button id="acceptAllCookiesBtn" class="btn primary">Accept All</button>
        </div>
    </div>
</div>

<!-- Accessibility Toggle Button -->
<button id="accessibilityToggleBtn" class="accessibility-toggle" aria-label="Accessibility options" aria-expanded="false" title="Accessibility settings">
    ♿
</button>

<!-- Accessibility Panel -->
<div id="accessibilityPanel" class="accessibility-panel" aria-hidden="true">
    <div class="accessibility-panel-content">
        <h3 style="margin-top:0;">Accessibility Options</h3>
        
        <div class="accessibility-option">
            <label for="highContrastToggle">
                <input type="checkbox" id="highContrastToggle"> High Contrast Mode
            </label>
        </div>

        <div class="accessibility-option">
            <label for="largerTextToggle">
                <input type="checkbox" id="largerTextToggle"> Larger Text
            </label>
        </div>

        <div class="accessibility-option">
            <label for="dyslexiaFontToggle">
                <input type="checkbox" id="dyslexiaFontToggle"> Dyslexia-Friendly Font
            </label>
        </div>

        <div class="accessibility-option">
            <label for="reducedMotionToggle">
                <input type="checkbox" id="reducedMotionToggle"> Reduce Motion
            </label>
        </div>

        <div class="accessibility-option">
            <label for="focusIndicatorToggle">
                <input type="checkbox" id="focusIndicatorToggle"> Enhanced Focus Indicators
            </label>
        </div>

        <button id="resetAccessibilityBtn" class="btn secondary" style="width:100%;margin-top:12px;">Reset to Default</button>
    </div>
</div>

<!-- Admin Panel Modal -->
<div id="adminModal" class="modal" aria-hidden="true">
    <div class="modal-content" style="max-width:900px;max-height:85vh;overflow:auto;">
        <span class="close" data-close>&times;</span>
        <h2>Admin Panel</h2>

        <!-- Stats Summary -->
        <div style="display:grid;grid-template-columns:repeat(2,1fr);gap:16px;margin-bottom:24px;">
            <div style="background:#f0f0f0;padding:12px;border-radius:6px;text-align:center;">
                <p style="margin:0;color:#666;">Total Bookings</p>
                <p id="adminTotalBookings" style="margin:0;font-size:1.8rem;font-weight:bold;color:var(--green-600);">0</p>
            </div>
            <div style="background:#f0f0f0;padding:12px;border-radius:6px;text-align:center;">
                <p style="margin:0;color:#666;">Month Revenue</p>
                <p id="adminTotalRevenue" style="margin:0;font-size:1.8rem;font-weight:bold;color:var(--green-600);">£0.00</p>
            </div>
        </div>

        <!-- Charts -->
        <div style="display:grid;grid-template-columns:repeat(2,1fr);gap:16px;margin-bottom:24px;">
            <div style="background:#fff;border:1px solid #ddd;border-radius:6px;padding:12px;">
                <canvas id="adminVolumeChart"></canvas>
            </div>
            <div style="background:#fff;border:1px solid #ddd;border-radius:6px;padding:12px;">
                <canvas id="adminRevenueChart"></canvas>
            </div>
        </div>

        <!-- Bookings Table -->
        <h3>All Bookings</h3>
        <div id="adminBookingsContainer" style="max-height:400px;overflow-y:auto;border:1px solid #ddd;border-radius:6px;">
            <p style="text-align:center;color:#666;padding:20px;">Loading bookings...</p>
        </div>

        <button id="adminRefreshBtn" class="btn primary" style="margin-top:16px;width:100%;">Refresh Data</button>
    </div>
</div>
