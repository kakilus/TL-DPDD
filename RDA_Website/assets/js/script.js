/* ============================================================
   MOBILE MENU
============================================================ */
const hamburger = document.querySelector('.hamburger');
const mobileNav = document.querySelector('.mobile-nav');

hamburger.addEventListener('click', () => {
    mobileNav.classList.toggle('open');
});

/* Close mobile menu when clicking outside */
document.addEventListener('click', (e) => {
    if (!hamburger.contains(e.target) && !mobileNav.contains(e.target)) {
        mobileNav.classList.remove('open');
    }
});

/* ============================================================
   ACCESSIBILITY PANEL & FEATURES
============================================================ */
function loadAccessibilitySettings() {
    try {
        const settings = JSON.parse(localStorage.getItem('accessibility_settings')) || {};
        
        // Apply each setting if it was enabled
        if (settings.highContrast) {
            document.body.classList.add('accessibility-high-contrast');
            document.getElementById('highContrastToggle').checked = true;
        }
        if (settings.largerText) {
            document.body.classList.add('accessibility-larger-text');
            document.getElementById('largerTextToggle').checked = true;
        }
        if (settings.dyslexiaFont) {
            document.body.classList.add('accessibility-dyslexia-font');
            document.getElementById('dyslexiaFontToggle').checked = true;
        }
        if (settings.reducedMotion) {
            document.body.classList.add('accessibility-reduce-motion');
            document.getElementById('reducedMotionToggle').checked = true;
        }
        if (settings.focusIndicators) {
            document.body.classList.add('accessibility-focus-indicators');
            document.getElementById('focusIndicatorToggle').checked = true;
        }
    } catch (e) {
        console.error('Error loading accessibility settings:', e);
    }
}

function saveAccessibilitySettings() {
    try {
        const settings = {
            highContrast: document.getElementById('highContrastToggle').checked,
            largerText: document.getElementById('largerTextToggle').checked,
            dyslexiaFont: document.getElementById('dyslexiaFontToggle').checked,
            reducedMotion: document.getElementById('reducedMotionToggle').checked,
            focusIndicators: document.getElementById('focusIndicatorToggle').checked
        };
        localStorage.setItem('accessibility_settings', JSON.stringify(settings));
    } catch (e) {
        console.error('Error saving accessibility settings:', e);
    }
}

document.addEventListener('DOMContentLoaded', () => {
    const toggleBtn = document.getElementById('accessibilityToggleBtn');
    const panel = document.getElementById('accessibilityPanel');
    const resetBtn = document.getElementById('resetAccessibilityBtn');

    // Load saved settings on page load
    loadAccessibilitySettings();

    // Toggle panel visibility
    if (toggleBtn) {
        toggleBtn.addEventListener('click', () => {
            const isHidden = panel.getAttribute('aria-hidden') === 'true';
            panel.setAttribute('aria-hidden', !isHidden ? 'true' : 'false');
            toggleBtn.setAttribute('aria-expanded', isHidden);
        });
    }

    // Wire all checkboxes to toggle features
    const highContrastToggle = document.getElementById('highContrastToggle');
    if (highContrastToggle) {
        highContrastToggle.addEventListener('change', () => {
            document.body.classList.toggle('accessibility-high-contrast');
            saveAccessibilitySettings();
        });
    }

    const largerTextToggle = document.getElementById('largerTextToggle');
    if (largerTextToggle) {
        largerTextToggle.addEventListener('change', () => {
            document.body.classList.toggle('accessibility-larger-text');
            saveAccessibilitySettings();
        });
    }

    const dyslexiaFontToggle = document.getElementById('dyslexiaFontToggle');
    if (dyslexiaFontToggle) {
        dyslexiaFontToggle.addEventListener('change', () => {
            document.body.classList.toggle('accessibility-dyslexia-font');
            saveAccessibilitySettings();
        });
    }

    const reducedMotionToggle = document.getElementById('reducedMotionToggle');
    if (reducedMotionToggle) {
        reducedMotionToggle.addEventListener('change', () => {
            document.body.classList.toggle('accessibility-reduce-motion');
            saveAccessibilitySettings();
        });
    }

    const focusIndicatorToggle = document.getElementById('focusIndicatorToggle');
    if (focusIndicatorToggle) {
        focusIndicatorToggle.addEventListener('change', () => {
            document.body.classList.toggle('accessibility-focus-indicators');
            saveAccessibilitySettings();
        });
    }

    // Reset to defaults
    if (resetBtn) {
        resetBtn.addEventListener('click', () => {
            document.body.classList.remove(
                'accessibility-high-contrast',
                'accessibility-larger-text',
                'accessibility-dyslexia-font',
                'accessibility-reduce-motion',
                'accessibility-focus-indicators'
            );
            document.getElementById('highContrastToggle').checked = false;
            document.getElementById('largerTextToggle').checked = false;
            document.getElementById('dyslexiaFontToggle').checked = false;
            document.getElementById('reducedMotionToggle').checked = false;
            document.getElementById('focusIndicatorToggle').checked = false;
            localStorage.removeItem('accessibility_settings');
        });
    }

    // Close panel when clicking outside
    document.addEventListener('click', (e) => {
        if (panel && toggleBtn && !panel.contains(e.target) && !toggleBtn.contains(e.target)) {
            panel.setAttribute('aria-hidden', 'true');
            toggleBtn.setAttribute('aria-expanded', 'false');
        }
    });
});

/* ============================================================
   MODAL SYSTEM
============================================================ */
const modalButtons = document.querySelectorAll('[data-modal-target]');
const modals = document.querySelectorAll('.modal');
const closeButtons = document.querySelectorAll('[data-close]');
const switchLinks = document.querySelectorAll('[data-switch]');

function openModal(id) {
    const modal = document.querySelector(id);
    modal.classList.add('active');
    // lock background scrolling while modal open
    document.body.classList.add('modal-open');
    
    // When bookings modal opens, load bookings
    if (id === '#bookingsModal') {
        loadUserBookings();
    }
    
    // When calendar modal opens, render the calendar
    if (id === '#calendarModal') {
        renderCalendar();
    }
    
    // When visitor modal opens, load user data
    if (id === '#visitorModal') {
        loadUserDataForBooking();
    }
    
    // When payment modal opens, render PayPal buttons and update price display
    if (id === '#paymentModal') {
        // Update payment price display
        const displayPrice = window.paymentAmount || '0.00';
        const priceDisplay = document.getElementById('paymentPriceDisplay');
        if (priceDisplay) {
            priceDisplay.textContent = `Total: £${(typeof displayPrice === 'number' ? displayPrice.toFixed(2) : displayPrice)}`;
        }
        try {
            renderBookingPayPal();
        } catch (e) {
            // ignore if PayPal SDK not loaded yet
        }
    }
}

/* ============================================================
   COOKIE CONSENT — bottom banner, localStorage persistence
 ============================================================ */
function showCookieConsentIfNeeded() {
    try {
        const existing = localStorage.getItem('cookie_consent');
        const banner = document.getElementById('cookieConsent');
        if (!banner) return;
        if (existing) {
            // user already made a choice — ensure banner hidden
            banner.style.display = 'none';
            return;
        }
        // show banner
        banner.style.display = 'block';
    } catch (e) {
        console.error('Cookie consent check failed', e);
    }
}

/* ============================================================
   AUTO-CHECK LOYALTY STATUS ON PAGE LOAD (after login)
============================================================ */
function checkAndUpdateLoyaltyStatus() {
    // Fetch user bookings/loyalty data and update displays
    fetch('index.php?fetch_bookings=1')
        .then(r => r.json())
        .then(data => {
            if (data.success) {
                // Update loyalty displays based on user's membership
                if (data.loyalty && data.loyalty.active) {
                    updateLoyaltyDisplays(data.loyalty);
                } else {
                    updateLoyaltyDisplays(null);
                }
            }
        })
        .catch(e => console.error('Error checking loyalty status:', e));
}

document.addEventListener('DOMContentLoaded', () => {
    // wire up cookie consent buttons
    const acceptAll = document.getElementById('acceptAllCookiesBtn');
    const acceptNecessary = document.getElementById('acceptNecessaryBtn');
    const policyLink = document.getElementById('cookiePolicyLink');
    const banner = document.getElementById('cookieConsent');

    if (acceptAll) {
        acceptAll.addEventListener('click', () => {
            try { localStorage.setItem('cookie_consent', 'all'); } catch (e) {}
            if (banner) banner.style.display = 'none';
        });
    }
    if (acceptNecessary) {
        acceptNecessary.addEventListener('click', () => {
            try { localStorage.setItem('cookie_consent', 'necessary'); } catch (e) {}
            if (banner) banner.style.display = 'none';
        });
    }

    if (policyLink) {
        policyLink.addEventListener('click', (e) => {
            e.preventDefault();
            // open the existing "coming soon" modal
            try {
                openModal('#footerWipModal');
            } catch (err) {
                // fallback: show alert
                alert('Cookie policy coming soon');
            }
        });
    }

    // final show/hide decision
    showCookieConsentIfNeeded();
});
function closeModal(modal) {
    modal.classList.remove('active');
    // restore background scrolling
    document.body.classList.remove('modal-open');
}

/* Open modal buttons */
modalButtons.forEach(btn => {
    btn.addEventListener('click', (e) => {
        const target = btn.getAttribute('data-modal-target');

        // Capture hotel selection from data attributes (from hotel cards)
        if (btn.dataset.hotel && btn.dataset.price) {
            selectedHotel = btn.dataset.hotel;
            selectedHotelPrice = parseFloat(btn.dataset.price);
            // Pre-select hotel in modal after it opens
            setTimeout(() => {
                const hotelSelect = document.getElementById('hotelSelect');
                if (hotelSelect) {
                    hotelSelect.value = selectedHotel;
                }
            }, 100);
        }

        // If opening the booking modal from another control (e.g. hero button),
        // ensure `selectedHotel` reflects the current select value in the form.
        if (target === '#bookingModal') {
            const hotelSelectElem = document.getElementById('hotelSelect');
            if (hotelSelectElem) {
                const val = hotelSelectElem.value;
                if (val && val !== '') {
                    selectedHotel = val;
                    const opt = hotelSelectElem.options[hotelSelectElem.selectedIndex];
                    selectedHotelPrice = parseFloat(opt?.dataset?.price) || selectedHotelPrice;
                }
            }
        }

        // VALIDATE HOTEL SELECTION and guest counts before opening calendar
        if (target === '#calendarModal') {
            // prefer reading the current select value if present (handles opening from hero)
            const hotelSelectElem = document.getElementById('hotelSelect');
            const currentHotel = hotelSelectElem ? hotelSelectElem.value : selectedHotel;

            if (!currentHotel || currentHotel === '') {
                e.preventDefault();
                alert('Please select a hotel first.');
                return;
            }
            // Ensure at least 1 adult is selected in the booking start form
            const adultsElem = document.getElementById('numAdults');
            const adultsCount = adultsElem ? (parseInt(adultsElem.value, 10) || 0) : 0;
            if (!Number.isInteger(adultsCount) || adultsCount < 1) {
                e.preventDefault();
                alert('Please select at least 1 adult for a hotel booking.');
                return;
            }
        }

        // REQUIRE LOGIN
        if (!isLoggedIn) {
            e.preventDefault();
            openModal('#loginModal');   // show login popup
            return;
        }

        // If logged in → allow modal to open normally
        openModal(target);
    });
});

/* Close modal buttons */
closeButtons.forEach(btn => {
    btn.addEventListener('click', () => {
        closeModal(btn.closest('.modal'));
    });
});

/* Switch between Login/Signup */
switchLinks.forEach(link => {
    link.addEventListener('click', (e) => {
        e.preventDefault();
        const current = link.closest('.modal');
        const next = link.getAttribute('data-switch');
        closeModal(current);
        openModal(next);
    });
});

/* If the server set an auth error, show it and open the login modal */
if (window.__authError) {
    try {
        alert(window.__authError);
        openModal('#loginModal');
    } catch (err) {
        // if modal functions not ready yet, try again shortly
        setTimeout(() => {
            try { openModal('#loginModal'); } catch (e) {}
        }, 200);
    }
    window.__authError = null;
}

/* NOTE: clicking outside the modal no longer closes it — user must press the X */

/* ============================================================
   LOAD USER DATA FOR BOOKING FORMS
============================================================ */

function loadUserDataForBooking() {
    fetch('index.php?fetch_bookings=1')
        .then(r => r.json())
        .then(data => {
            if (data.success && data.user) {
                // Pre-populate visitor form with user data from database
                const visitorEmail = document.getElementById('visitorEmail');
                const visitorPhone = document.getElementById('visitorPhone');
                
                if (visitorEmail) visitorEmail.value = data.user.email || '';
                if (visitorPhone) visitorPhone.value = data.user.phone || '';

                // Store user info in window variables for later use
                window.currentUserName = data.user.name || '';
                window.currentUserEmail = data.user.email || '';
                window.currentUserPhone = data.user.phone || '';
            }
        })
        .catch(e => console.error('Error loading user data:', e));
}

/* ============================================================
   YOUR BOOKINGS MODAL - LOAD AND DISPLAY
============================================================ */

function loadUserBookings() {
    const container = document.getElementById('bookingsContainer');
    container.innerHTML = '<p style="text-align:center;color:#666;">Loading your bookings...</p>';

    fetch('index.php?fetch_bookings=1')
        .then(r => r.json())
        .then(data => {
            if (!data.success) {
                container.innerHTML = `<p style="color:red;">Error: ${data.error}</p>`;
                return;
            }

            // Update loyalty displays based on user's membership
            if (data.loyalty && data.loyalty.active) {
                updateLoyaltyDisplays(data.loyalty);
            } else {
                updateLoyaltyDisplays(null);
            }

            let html = '';

            // User Info Section
            if (data.user) {
                html += `
                    <div style="background:#f8f9fa;padding:15px;border-radius:8px;margin-bottom:15px;border-left:4px solid var(--green-600);">
                        <h3 style="margin:0 0 10px 0;color:var(--green-600);">Account Information</h3>
                        <p style="margin:5px 0;"><strong>Name:</strong> ${data.user.name || 'N/A'}</p>
                        <p style="margin:5px 0;"><strong>Email:</strong> ${data.user.email || 'N/A'}</p>
                        <p style="margin:5px 0;"><strong>Phone:</strong> ${data.user.phone || 'N/A'}</p>
                    </div>
                `;
            }

            // Loyalty Status Section
            if (data.loyalty) {
                const tier = data.loyalty.tier || 'None';
                const active = data.loyalty.active ? 'Active' : 'Inactive';
                const expiryDate = data.loyalty.expires_date ? new Date(data.loyalty.expires_date).toLocaleDateString() : 'Lifetime';
                html += `
                    <div style="background:#f0f7ff;padding:15px;border-radius:8px;margin-bottom:15px;border-left:4px solid #007bff;">
                        <h3 style="margin:0 0 10px 0;color:#007bff;">Loyalty Membership</h3>
                        <p style="margin:5px 0;"><strong>Tier:</strong> <span style="font-size:1.1em;font-weight:bold;">${tier}</span></p>
                        <p style="margin:5px 0;"><strong>Status:</strong> ${active}</p>
                        <p style="margin:5px 0;"><strong>Amount Paid:</strong> £${parseFloat(data.loyalty.total_price).toFixed(2)}</p>
                        <p style="margin:5px 0;"><strong>Expires:</strong> ${expiryDate}</p>
                    </div>
                `;
            } else {
                html += `
                    <div style="background:#fff3cd;padding:15px;border-radius:8px;margin-bottom:15px;border-left:4px solid #ffc107;">
                        <p><strong>No loyalty membership active.</strong> <a href="#loyalty" style="color:var(--green-600);text-decoration:underline;">Join today!</a></p>
                    </div>
                `;
            }

            // Hotel Bookings Section
            html += '<h3 style="margin-top:20px;margin-bottom:10px;color:#333;">Hotel Bookings</h3>';
            if (data.hotels && data.hotels.length > 0) {
                data.hotels.forEach((hotel, idx) => {
                    const checkIn = new Date(hotel.check_in).toLocaleDateString();
                    const checkOut = new Date(hotel.check_out).toLocaleDateString();
                    html += `
                        <div style="background:#fff;border:1px solid #ddd;border-radius:8px;padding:12px;margin-bottom:10px;cursor:pointer;" onclick="viewBookingDetails('hotel', ${idx}, '${JSON.stringify(hotel).replace(/'/g, "&#39;")}')">
                            <div style="display:flex;justify-content:space-between;align-items:center;">
                                <div>
                                    <strong style="font-size:1.1em;">${hotel.hotel_name}</strong>
                                    <p style="margin:5px 0;color:#666;">Check-in: ${checkIn} | Check-out: ${checkOut}</p>
                                    <p style="margin:5px 0;color:#666;">Guests: ${hotel.adults} adult(s), ${hotel.children} child(ren)</p>
                                </div>
                                <div style="text-align:right;">
                                    <p style="margin:0;font-size:1.2em;font-weight:bold;color:var(--green-600);">£${parseFloat(hotel.total_price).toFixed(2)}</p>
                                    <p style="margin:5px 0;font-size:0.9em;color:#999;">Click for details</p>
                                </div>
                            </div>
                        </div>
                    `;
                });
            } else {
                html += '<p style="color:#999;font-style:italic;">No hotel bookings yet.</p>';
            }

            // Zoo Visit Bookings Section
            html += '<h3 style="margin-top:20px;margin-bottom:10px;color:#333;">Zoo Visits</h3>';
            if (data.visits && data.visits.length > 0) {
                data.visits.forEach((visit, idx) => {
                    const visitDate = new Date(visit.visit_date).toLocaleDateString();
                    html += `
                        <div style="background:#fff;border:1px solid #ddd;border-radius:8px;padding:12px;margin-bottom:10px;cursor:pointer;" onclick="viewBookingDetails('visit', ${idx}, '${JSON.stringify(visit).replace(/'/g, "&#39;")}')">
                            <div style="display:flex;justify-content:space-between;align-items:center;">
                                <div>
                                    <strong style="font-size:1.1em;">Zoo Visit</strong>
                                    <p style="margin:5px 0;color:#666;">Date: ${visitDate} | Time: ${visit.visit_time}</p>
                                    <p style="margin:5px 0;color:#666;">Visitors: ${visit.adults} adult(s), ${visit.children} child(ren), ${visit.seniors} senior(s)</p>
                                </div>
                                <div style="text-align:right;">
                                    <p style="margin:0;font-size:1.2em;font-weight:bold;color:var(--green-600);">£${parseFloat(visit.total_price).toFixed(2)}</p>
                                    <p style="margin:5px 0;font-size:0.9em;color:#999;">Click for details</p>
                                </div>
                            </div>
                        </div>
                    `;
                });
            } else {
                html += '<p style="color:#999;font-style:italic;">No zoo visits booked yet.</p>';
            }

            container.innerHTML = html;
        })
        .catch(err => {
            container.innerHTML = `<p style="color:red;">Error loading bookings: ${err.message}</p>`;
        });
}

function viewBookingDetails(type, index, dataStr) {
    const data = JSON.parse(dataStr);
    const modal = document.getElementById('bookingDetailsModal');
    const title = document.getElementById('detailsModalTitle');
    const content = document.getElementById('detailsContent');

    if (type === 'hotel') {
        title.textContent = 'Hotel Booking Details';
        const checkIn = new Date(data.check_in).toLocaleDateString();
        const checkOut = new Date(data.check_out).toLocaleDateString();
        content.innerHTML = `
            <div style="background:#f8f9fa;padding:15px;border-radius:8px;">
                <h4 style="margin-top:0;color:var(--green-600);">${data.hotel_name}</h4>
                
                <div style="display:grid;gap:12px;margin:15px 0;">
                    <div>
                        <strong>Check-In Date:</strong><br>
                        ${checkIn}
                    </div>
                    <div>
                        <strong>Check-Out Date:</strong><br>
                        ${checkOut}
                    </div>
                    <div>
                        <strong>Number of Nights:</strong><br>
                        ${data.nights}
                    </div>
                    <div>
                        <strong>Guests:</strong><br>
                        ${data.adults} adult(s), ${data.children} child(ren)
                    </div>
                    <div>
                        <strong>Guest Name:</strong><br>
                        ${data.guest_name}
                    </div>
                    <div>
                        <strong>Guest Email:</strong><br>
                        ${data.guest_email}
                    </div>
                    <div>
                        <strong>Guest Phone:</strong><br>
                        ${data.guest_phone}
                    </div>
                    <div style="border-top:2px solid #ddd;padding-top:12px;margin-top:12px;">
                        <strong style="font-size:1.2em;color:var(--green-600);">Total Price: £${parseFloat(data.total_price).toFixed(2)}</strong>
                    </div>
                    <div>
                        <strong>Payment Method:</strong><br>
                        ${data.payment_method || 'N/A'}
                    </div>
                    <div>
                        <strong>Status:</strong><br>
                        <span style="background:var(--green-100);color:var(--green-700);padding:4px 8px;border-radius:4px;font-weight:bold;">${data.status}</span>
                    </div>
                </div>
            </div>
        `;
    } else if (type === 'visit') {
        title.textContent = 'Zoo Visit Details';
        const visitDate = new Date(data.visit_date).toLocaleDateString();
        content.innerHTML = `
            <div style="background:#f8f9fa;padding:15px;border-radius:8px;">
                <h4 style="margin-top:0;color:var(--green-600);">Zoo Visit</h4>
                
                <div style="display:grid;gap:12px;margin:15px 0;">
                    <div>
                        <strong>Visit Date:</strong><br>
                        ${visitDate}
                    </div>
                    <div>
                        <strong>Entry Time:</strong><br>
                        ${data.visit_time}
                    </div>
                    <div>
                        <strong>Adult Visitors (£29.99 each):</strong><br>
                        ${data.adults}
                    </div>
                    <div>
                        <strong>Child Visitors 3-12 (£19.99 each):</strong><br>
                        ${data.children}
                    </div>
                    <div>
                        <strong>Senior Visitors 65+ (£24.99 each):</strong><br>
                        ${data.seniors}
                    </div>
                    <div style="border-top:2px solid #ddd;padding-top:12px;margin-top:12px;">
                        <strong style="font-size:1.2em;color:var(--green-600);">Total Price: £${parseFloat(data.total_price).toFixed(2)}</strong>
                    </div>
                    <div>
                        <strong>Payment Method:</strong><br>
                        ${data.payment_method || 'N/A'}
                    </div>
                    <div>
                        <strong>Status:</strong><br>
                        <span style="background:var(--green-100);color:var(--green-700);padding:4px 8px;border-radius:4px;font-weight:bold;">${data.status}</span>
                    </div>
                </div>
            </div>
        `;
    }

    openModal('#bookingDetailsModal');
}

/* ============================================================
   LOGIN / SIGNUP — Client validation, submit to server
============================================================ */
const loginForm = document.querySelector('#loginForm');
if (loginForm) {
    loginForm.addEventListener('submit', (e) => {
        const email = document.getElementById('loginEmail').value || '';
        const password = document.getElementById('loginPassword').value || '';

        if (email.indexOf('@') === -1 || email.indexOf('.') === -1) {
            e.preventDefault();
            alert('Please enter a valid email address.');
            return;
        }

        if (password.length < 1) {
            e.preventDefault();
            alert('Please enter your password.');
            return;
        }

        // allow normal form submit to server
    });
}

const signupForm = document.querySelector('#signupForm');
if (signupForm) {
    signupForm.addEventListener('submit', (e) => {
        const name = document.getElementById('signupName').value || '';
        const email = document.getElementById('signupEmail').value || '';
        const phoneRaw = (document.getElementById('signupPhone') && document.getElementById('signupPhone').value) || '';
        const password = document.getElementById('signupPassword').value || '';

        if (!name.trim()) {
            e.preventDefault();
            alert('Please enter your full name.');
            return;
        }

        if (email.indexOf('@') === -1 || email.indexOf('.') === -1) {
            e.preventDefault();
            alert('Please enter a valid email address.');
            return;
        }

        // validate phone length (count digits only)
        const phoneDigits = phoneRaw.replace(/\D/g, '');
        if (phoneDigits.length < 7 || phoneDigits.length > 15) {
            e.preventDefault();
            alert('Please enter a valid phone number (7 to 15 digits).');
            return;
        }

        if (password.length < 8) {
            e.preventDefault();
            alert('Password must be at least 8 characters.');
            return;
        }

        // allow normal form submit to server
    });
}

/* ============================================================
   BOOKING STORAGE FUNCTION - SEND TO DATABASE
============================================================ */
function storeBooking(paymentMethod) {
    const formData = new FormData();
    formData.append('payment_method', paymentMethod);

    if (window.paymentContext === 'hotel') {
        const booking = window.hotelBookingData || {};
        formData.append('store_hotel_booking', '1');
        formData.append('hotel_name', booking.hotel);
        // ensure adults default to 1 if missing
        const adultsCount = (booking.adults !== undefined && booking.adults !== null) ? booking.adults : 1;
        formData.append('adults', adultsCount);
        formData.append('children', booking.children);
        formData.append('check_in', checkInDate);
        formData.append('check_out', checkOutDate);
        // Fill guest details from booking or fallback to logged-in user info
        const guestName = booking.name || window.currentUserName || '';
        const guestEmail = booking.email || window.currentUserEmail || '';
        const guestPhone = booking.phone || window.currentUserPhone || '';
        formData.append('guest_name', guestName);
        formData.append('guest_email', guestEmail);
        formData.append('guest_phone', guestPhone);
        formData.append('total_price', booking.hotelTotal);
        formData.append('nights', booking.nights);

        fetch('index.php', { method: 'POST', body: formData })
            .then(r => r.json())
            .then(data => {
                if (data.success) {
                    alert('Hotel booking confirmed');
                    console.log('Hotel booking stored:', data.booking_id);
                    // Refresh user/admin bookings
                    try { loadUserBookings(); } catch (e) {}
                    try { loadAdminData(); } catch (e) {}
                } else {
                    alert('Error storing hotel booking: ' + (data.error || 'Unknown error'));
                    console.error('Error storing hotel booking:', data.error);
                }
            })
            .catch(err => console.error('Fetch error:', err));
    } 
    else if (window.paymentContext === 'zoo-visit') {
        const visit = window.visitBookingData || {};
        formData.append('store_visit_booking', '1');
        formData.append('visit_date', visit.date);
        formData.append('visit_time', visit.time);
        formData.append('adults', visit.adults);
        formData.append('children', visit.children);
        formData.append('seniors', visit.seniors);
        formData.append('total_price', visit.total);

        fetch('index.php', { method: 'POST', body: formData })
            .then(r => r.json())
            .then(data => {
                if (data.success) {
                    alert('Zoo visit booking confirmed');
                    console.log('Zoo visit booking stored:', data.booking_id);
                    // Refresh user/admin bookings
                    try { loadUserBookings(); } catch (e) {}
                    try { loadAdminData(); } catch (e) {}
                } else {
                    alert('Error storing zoo booking: ' + (data.error || 'Unknown error'));
                    console.error('Error storing zoo booking:', data.error);
                }
            })
            .catch(err => console.error('Fetch error:', err));
    }
    else if (window.paymentContext === 'loyalty') {
        const pending = window.pendingLoyalty || {};
        formData.append('store_loyalty_membership', '1');
        formData.append('tier', pending.tier || selectedTier);
        formData.append('total_price', window.paymentAmount);

        fetch('index.php', { method: 'POST', body: formData })
            .then(r => r.json())
            .then(data => {
                if (data.success) {
                    console.log('Loyalty membership stored:', data.membership_id);
                } else {
                    console.error('Error storing loyalty membership:', data.error);
                }
            })
            .catch(err => console.error('Fetch error:', err));
    }
}

/* ============================================================
   BOOKING FLOW + INTERACTIVE CALENDAR + PRICING
============================================================ */
let checkInDate = null;
let checkOutDate = null;
let selectedHotel = '';
let selectedHotelPrice = 0;

// Zoo visit pricing constants
const ZOO_PRICES = {
    adult: 29.99,
    child: 19.99,
    senior: 24.99
};

// Update zoo visit price display in real-time
function updateVisitPrice() {
    const adults = parseInt(document.getElementById('visitAdults').value) || 0;
    const children = parseInt(document.getElementById('visitChildren').value) || 0;
    const seniors = parseInt(document.getElementById('visitSeniors').value) || 0;
    const total = (adults * ZOO_PRICES.adult) + (children * ZOO_PRICES.child) + (seniors * ZOO_PRICES.senior);
    
    document.getElementById('visitPriceDisplay').textContent = `Total: £${total.toFixed(2)}`;
    
    // Store in window for payment modal
    window.paymentAmount = total;
    window.paymentContext = 'zoo-visit';
}

// Listen for changes to visitor counts
document.getElementById('visitAdults')?.addEventListener('change', updateVisitPrice);
document.getElementById('visitChildren')?.addEventListener('change', updateVisitPrice);
document.getElementById('visitSeniors')?.addEventListener('change', updateVisitPrice);

/* RENDER CALENDAR */
function renderCalendar() {
    const container = document.getElementById('calendarContainer');
    container.innerHTML = "";

    const today = new Date();
    const year = today.getFullYear();
    const month = today.getMonth();

    const firstDay = new Date(year, month, 1).getDay();
    const daysInMonth = new Date(year, month + 1, 0).getDate();

    let html = `
        <h3>${today.toLocaleString('default', { month: 'long' })} ${year}</h3>
        <div class="calendar-grid">
            <div class="day">Sun</div><div class="day">Mon</div>
            <div class="day">Tue</div><div class="day">Wed</div>
            <div class="day">Thu</div><div class="day">Fri</div><div class="day">Sat</div>
    `;

    /* Empty slots */
    for (let i = 0; i < firstDay; i++) {
        html += `<div class="empty"></div>`;
    }

    /* Actual days */
    for (let d = 1; d <= daysInMonth; d++) {
        const dateString = `${year}-${month + 1}-${d}`;

        html += `<div class="calendar-day" data-date="${dateString}">${d}</div>`;
    }

    html += `</div>`;
    container.innerHTML = html;

    /* Day click handler */
    document.querySelectorAll('.calendar-day').forEach(day => {
        day.addEventListener('click', () => {
            const date = day.getAttribute('data-date');

            if (!checkInDate) {
                checkInDate = date;
                updateCalendarHighlight();
            } else if (!checkOutDate) {
                // Ensure check-out is after check-in
                if (date > checkInDate) {
                    checkOutDate = date;
                    updateCalendarHighlight();
                } else {
                    alert('Check-out date must be after check-in date.');
                }
            } else {
                /* Reset if selecting again */
                checkInDate = date;
                checkOutDate = null;
                updateCalendarHighlight();
            }
        });
    });
    updateCalendarHighlight();
}

/* Highlight selected check-in and check-out dates */
function updateCalendarHighlight() {
    document.querySelectorAll('.calendar-day').forEach(day => {
        day.classList.remove('selected');
    });
    
    if (checkInDate) {
        const checkinElem = document.querySelector(`[data-date="${checkInDate}"]`);
        if (checkinElem) checkinElem.classList.add('selected');
    }
    
    if (checkOutDate) {
        const checkoutElem = document.querySelector(`[data-date="${checkOutDate}"]`);
        if (checkoutElem) checkoutElem.classList.add('selected');
    }
}

/* ON CLICK "Choose Dates" - Validate hotel selection first */


// Listen for hotel selection changes in the booking modal
const hotelSelect = document.getElementById('hotelSelect');
if (hotelSelect) {
    hotelSelect.addEventListener('change', (e) => {
        selectedHotel = e.target.value;
        const selectedOption = e.target.options[e.target.selectedIndex];
        selectedHotelPrice = parseFloat(selectedOption.dataset.price) || 0;
    });
}

/* Calendar → Visitor Modal */
document.getElementById('calendarNextBtn').addEventListener('click', () => {
    if (!checkInDate || !checkOutDate) {
        alert("Please select a check-in AND check-out date.");
        return;
    }
    closeModal(document.querySelector('#calendarModal'));
    openModal('#visitorModal');
});

/* Visitor → Payment */
document.getElementById('visitorNextBtn').addEventListener('click', () => {
    const name = window.currentUserName || '';
    const email = document.getElementById('visitorEmail').value;
    const phone = document.getElementById('visitorPhone').value;
    const adults = parseInt(document.getElementById('numAdults').value, 10) || 0;
    const children = parseInt(document.getElementById('numChildren').value) || 0;
    
    if (!name) {
        alert('Error loading user name. Please refresh the page.');
        return;
    }
    // Validate adult count (must be at least 1)
    if (!Number.isInteger(adults) || adults < 1) {
        alert('Please select at least 1 adult for a hotel booking.');
        return;
    }
    if (!selectedHotel || selectedHotel === '') {
        alert('Please select a hotel');
        return;
    }

    // Calculate nights from check-in and check-out dates
    const checkinDate = new Date(checkInDate);
    const checkoutDate = new Date(checkOutDate);
    const nights = Math.ceil((checkoutDate - checkinDate) / (1000 * 60 * 60 * 24));
    
    // Calculate hotel price: (adults + children) * price per person per night * nights
    const totalPeople = adults + children;
    const hotelTotal = totalPeople * selectedHotelPrice * nights;

    // Store booking data in window
    window.hotelBookingData = { name, email, phone, hotel: selectedHotel, adults, children, nights, hotelTotal };
    window.paymentAmount = hotelTotal;
    window.paymentContext = 'hotel';

    closeModal(document.querySelector('#visitorModal'));
    openModal('#paymentModal');
});
/* PAYMENT — PayPal integration (sandbox). Buttons render when payment modal opens. */

function renderBookingPayPal() {
    const container = document.getElementById('paypalPaymentButtons');
    if (!container || typeof paypal === 'undefined') return;
    // clear any previous buttons
    container.innerHTML = '';

    // Determine amount: use paymentAmount if set (loyalty or dynamic), otherwise default to £10.00
    let amount = '10.00';
    if (window.paymentAmount !== undefined && window.paymentAmount !== null) {
        if (typeof window.paymentAmount === 'number') amount = window.paymentAmount.toFixed(2);
        else amount = String(window.paymentAmount);
    }

    paypal.Buttons({
        createOrder: function(data, actions) {
            return actions.order.create({
                purchase_units: [{ amount: { value: amount } }]
            });
        },
        onApprove: function(data, actions) {
            return actions.order.capture().then(function(details) {
                // Store booking in database
                storeBooking('paypal');
                
                closeModal(document.querySelector('#paymentModal'));
                openModal('#confirmationModal');
                const confirmationBox = document.getElementById('confirmationDetails');
                
                // Show context-specific confirmation
                if (window.paymentContext === 'loyalty') {
                    const pending = window.pendingLoyalty || {};
                    confirmationBox.innerHTML = `
                        <p><strong>${pending.tier || selectedTier} Membership Successfully Purchased!</strong></p>
                        <p>Name: ${pending.name || ''}</p>
                        <p>Email: ${pending.email || ''}</p>
                        <p>Amount Paid: £${(window.paymentAmount || 0).toFixed(2)}</p>
                        <p>Payment status: ${details.status}</p>
                    `;
                } else if (window.paymentContext === 'hotel') {
                    const booking = window.hotelBookingData || {};
                    confirmationBox.innerHTML = `
                        <p><strong>Hotel Booking Confirmed!</strong></p>
                        <p>Hotel: ${booking.hotel}</p>
                        <p>Check-In: ${checkInDate}</p>
                        <p>Check-Out: ${checkOutDate}</p>
                        <p>Guests: ${booking.adults} adults, ${booking.children} children</p>
                        <p>Amount Paid: £${(booking.hotelTotal || 0).toFixed(2)}</p>
                        <p>Payment status: ${details.status}</p>
                    `;
                } else if (window.paymentContext === 'zoo-visit') {
                    const visit = window.visitBookingData || {};
                    confirmationBox.innerHTML = `
                        <p><strong>Zoo Visit Booked!</strong></p>
                        <p>Date: ${visit.date}</p>
                        <p>Entry Time: ${visit.time}</p>
                        <p>Visitors: ${visit.adults} adults, ${visit.children} children, ${visit.seniors} seniors</p>
                        <p>Amount Paid: £${(visit.total || 0).toFixed(2)}</p>
                        <p>Payment status: ${details.status}</p>
                    `;
                } else {
                    confirmationBox.innerHTML = `
                        <p><strong>Booking Confirmed!</strong></p>
                        <p>Check-In: ${checkInDate}</p>
                        <p>Check-Out: ${checkOutDate}</p>
                        <p>Your visit has been scheduled. A confirmation email is on its way.</p>
                        <p>Payment received: ${details.status}</p>
                    `;
                }
                
                // clear payment context
                window.paymentContext = null;
                window.paymentAmount = null;
                window.pendingLoyalty = null;
                window.hotelBookingData = null;
                window.visitBookingData = null;
            });
        },
        onError: function(err) { alert('Payment error: ' + err); }
    }).render('#paypalPaymentButtons');
}

/* Card Payment Handler */
document.getElementById('paymentForm').addEventListener('submit', (e) => {
    e.preventDefault();

    const cardNumber = document.getElementById('cardNumber').value;
    const cardExpiry = document.getElementById('cardExpiry').value;
    const cardCVC = document.getElementById('cardCVC').value;

    if (!cardNumber || !cardExpiry || !cardCVC) {
        alert('Please fill in all card details.');
        return;
    }

    // Store booking in database
    storeBooking('card');
    
    // Simulate card payment processing
    closeModal(document.querySelector('#paymentModal'));
    openModal('#confirmationModal');
    const confirmationBox = document.getElementById('confirmationDetails');
    
    // Show context-specific confirmation for card payment
    if (window.paymentContext === 'loyalty') {
        const pending = window.pendingLoyalty || {};
        confirmationBox.innerHTML = `
            <p><strong>${pending.tier || selectedTier} Membership Successfully Purchased!</strong></p>
            <p>Name: ${pending.name || ''}</p>
            <p>Email: ${pending.email || ''}</p>
            <p>Amount Paid: £${(window.paymentAmount || 0).toFixed(2)}</p>
            <p>Payment status: Completed</p>
        `;
    } else if (window.paymentContext === 'hotel') {
        const booking = window.hotelBookingData || {};
        confirmationBox.innerHTML = `
            <p><strong>Hotel Booking Confirmed!</strong></p>
            <p>Hotel: ${booking.hotel}</p>
            <p>Check-In: ${checkInDate}</p>
            <p>Check-Out: ${checkOutDate}</p>
            <p>Guests: ${booking.adults} adults, ${booking.children} children</p>
            <p>Amount Paid: £${(booking.hotelTotal || 0).toFixed(2)}</p>
            <p>Payment status: Completed</p>
        `;
    } else if (window.paymentContext === 'zoo-visit') {
        const visit = window.visitBookingData || {};
        confirmationBox.innerHTML = `
            <p><strong>Zoo Visit Booked!</strong></p>
            <p>Date: ${visit.date}</p>
            <p>Entry Time: ${visit.time}</p>
            <p>Visitors: ${visit.adults} adults, ${visit.children} children, ${visit.seniors} seniors</p>
            <p>Amount Paid: £${(visit.total || 0).toFixed(2)}</p>
            <p>Payment status: Completed</p>
        `;
    } else {
        confirmationBox.innerHTML = `
            <p><strong>Booking Confirmed!</strong></p>
            <p>Your booking has been completed successfully.</p>
            <p>Amount Paid: £${(window.paymentAmount || 0).toFixed(2)}</p>
            <p>A confirmation email is on its way.</p>
        `;
    }
    
    // Clear payment context
    window.paymentContext = null;
    window.paymentAmount = null;
    window.pendingLoyalty = null;
    window.hotelBookingData = null;
    window.visitBookingData = null;
});

let visitDate = null;

/* Render Single-Date Calendar */
function renderVisitCalendar() {
    const container = document.getElementById('visitCalendarContainer');
    container.innerHTML = "";

    const today = new Date();
    const year = today.getFullYear();
    const month = today.getMonth();

    const firstDay = new Date(year, month, 1).getDay();
    const daysInMonth = new Date(year, month + 1, 0).getDate();

    let html = `
        <h3>${today.toLocaleString('default', { month: 'long' })} ${year}</h3>
        <div class="calendar-grid">
            <div class="day">Sun</div><div class="day">Mon</div>
            <div class="day">Tue</div><div class="day">Wed</div>
            <div class="day">Thu</div><div class="day">Fri</div><div class="day">Sat</div>
    `;

    for (let i = 0; i < firstDay; i++) html += `<div class="empty"></div>`;

    for (let d = 1; d <= daysInMonth; d++) {
        const dateString = `${year}-${month + 1}-${d}`;
        html += `<div class="calendar-day" data-date="${dateString}">${d}</div>`;
    }

    html += `</div>`;
    container.innerHTML = html;

    // Click handler
    document.querySelectorAll('#visitCalendarContainer .calendar-day').forEach(day => {
        day.addEventListener('click', () => {
            visitDate = day.getAttribute('data-date');

            document
                .querySelectorAll('#visitCalendarContainer .calendar-day')
                .forEach(d => d.classList.remove('selected'));

            day.classList.add('selected');
        });
    });
}

/* Open calendar on click */
document.querySelector('[data-modal-target="#visitBookingCalendar"]')
    .addEventListener('click', () => {
        renderVisitCalendar();
    });

/* Move to Timeslot Selection */
const visitDateNextBtn = document.getElementById('visitDateNextBtn');
if (visitDateNextBtn) {
    visitDateNextBtn.addEventListener('click', () => {
        if (!visitDate) {
            alert("Please select a visit date.");
            return;
        }

        closeModal(document.getElementById('visitBookingCalendar'));
        openModal('#visitTimeModal');

        loadTimeSlots();
    });
}

/* Load time slots based on weekday rules */
function loadTimeSlots() {
    const select = document.getElementById('visitTimeSelect');
    select.innerHTML = `<option value="">Select a time...</option>`;

    const day = new Date(visitDate).getDay();

    let open, close;

    if (day === 0 || day === 6) {
        // Sat & Sun — open 8am–7pm
        open = 8;
        close = 18; // last entry 6pm
    } else {
        // Mon–Fri — open 9am–6pm
        open = 9;
        close = 17; // last entry 5pm
    }

    for (let hour = open; hour <= close; hour++) {
        const display = hour <= 12 ? `${hour}am` : `${hour - 12}pm`;
        select.innerHTML += `<option value="${display}">${display}</option>`;
    }
}

/* Time → Details */
const visitTimeNextBtn = document.getElementById('visitTimeNextBtn');
if (visitTimeNextBtn) {
    visitTimeNextBtn.addEventListener('click', () => {
        const selectedTime = document.getElementById('visitTimeSelect').value;

        if (!selectedTime || selectedTime === '') {
            alert('Please select a time slot.');
            return;
        }

        closeModal(document.getElementById('visitTimeModal'));
        openModal('#visitDetailsModal');
    });
}

/* Details → Payment */
document.getElementById('visitDetailsForm').addEventListener('submit', (e) => {
    e.preventDefault();

    const adults = parseInt(document.getElementById('visitAdults').value, 10) || 0;
    const children = parseInt(document.getElementById('visitChildren').value, 10) || 0;
    const seniors = parseInt(document.getElementById('visitSeniors').value, 10) || 0;
    const selectedTime = document.getElementById('visitTimeSelect').value;

    if (!selectedTime || selectedTime === '') {
        alert('Please select a time slot.');
        return;
    }

    // Ensure at least one adult is present for a visit
    if (!Number.isInteger(adults) || adults < 1) {
        alert('Please select at least 1 adult for a zoo visit.');
        return;
    }

    const total = (adults * ZOO_PRICES.adult) + (children * ZOO_PRICES.child) + (seniors * ZOO_PRICES.senior);

    // Store visitor data in window for confirmation
    window.visitBookingData = { adults, children, seniors, total, date: visitDate, time: selectedTime };
    window.paymentAmount = total;
    window.paymentContext = 'zoo-visit';

    closeModal(document.getElementById('visitDetailsModal'));
    openModal('#paymentModal');
});

/* ============================================================
   LOYALTY MEMBERSHIP SYSTEM
============================================================ */

let selectedTier = null;
let membershipPrice = 0;

// Function to update loyalty tier displays based on user's membership status
function updateLoyaltyDisplays(userLoyalty) {
    document.querySelectorAll('.loyalty-tier-display').forEach(display => {
        const tier = display.getAttribute('data-tier');
        let html = '';
        
        if (userLoyalty && userLoyalty.tier && userLoyalty.active) {
            // User has an active membership
            if (userLoyalty.tier === tier) {
                html = `<p style="font-weight:bold;color:#32702A;margin:0;padding:12px;text-align:center;">✓ Current Member</p>`;
            } else {
                html = `<button class="btn primary join-tier" data-tier="${tier}">Upgrade to ${tier}</button>`;
            }
        } else {
            // User is not a member or membership inactive
            html = `<button class="btn primary join-tier" data-tier="${tier}">Join ${tier}</button>`;
        }
        
        display.innerHTML = html;
    });
    
    // Re-attach event listeners to newly created buttons
    attachJoinTierListeners();
}

// Function to attach listeners to join-tier buttons
function attachJoinTierListeners() {
    document.querySelectorAll('.join-tier').forEach(btn => {
        btn.addEventListener('click', () => {
            selectedTier = btn.getAttribute('data-tier');

        // Assign price
        if (selectedTier === "Bronze") membershipPrice = 0;
        if (selectedTier === "Silver") membershipPrice = 49;
        if (selectedTier === "Gold") membershipPrice = 99;

        // Show tier name in modal
        document.getElementById('loyaltyTierSelected').textContent =
            `Selected Tier: ${selectedTier}`;

        openModal('#loyaltyDetailsModal');
        });
    });
}

/* Details submitted */
document.getElementById('loyaltyDetailsForm').addEventListener('submit', (e) => {
    e.preventDefault();

    // Collect name/email whether visible or hidden
    const name = (document.getElementById('loyaltyName') && document.getElementById('loyaltyName').value) || '';
    const email = (document.getElementById('loyaltyEmail') && document.getElementById('loyaltyEmail').value) || '';

    if (membershipPrice === 0) {
        // Free tier (Bronze) → store to database without payment
        window.paymentContext = 'loyalty';
        window.paymentAmount = 0;
        window.pendingLoyalty = { name: name, email: email, tier: selectedTier };
        
        // Store the free membership
        storeBooking('free');
        
        closeModal(document.getElementById('loyaltyDetailsModal'));
        openModal('#confirmationModal');

        document.getElementById('confirmationDetails').innerHTML = `
            <p><strong>${selectedTier} Membership Activated!</strong></p>
            <p>Welcome aboard — you now have access to all ${selectedTier} benefits.</p>
        `;
        return;
    }

    // For paid tiers → reuse the main payment modal
    window.paymentContext = 'loyalty';
    window.paymentAmount = membershipPrice;
    window.pendingLoyalty = { name: name, email: email, tier: selectedTier };

    closeModal(document.getElementById('loyaltyDetailsModal'));
    // show the payment modal (Paypal buttons will render there)
    openModal('#paymentModal');
});

// loyalty payments are handled via renderBookingPayPal() using window.paymentContext/paymentAmount



/* Footer WIP Modal Trigger */
document.querySelectorAll('.footer-link').forEach(link => {
    link.addEventListener('click', (e) => {
        e.preventDefault();
        openModal('#footerWipModal');
    });
});

/* ============================================================
   ADMIN PANEL
============================================================ */
let adminVolumeChart = null;
let adminRevenueChart = null;

function loadAdminData() {
    // Fetch all bookings
    fetch('index.php?admin_fetch_bookings=1')
        .then(r => r.json())
        .then(data => {
            if (data.success) {
                renderAdminBookings(data.hotels, data.visits);
            }
        })
        .catch(e => console.error('Error loading admin bookings:', e));

    // Fetch stats and render charts
    fetch('index.php?admin_fetch_stats=1')
        .then(r => r.json())
        .then(data => {
            if (data.success) {
                renderAdminCharts(data.volume, data.revenue);
            }
        })
        .catch(e => console.error('Error loading admin stats:', e));
}

function renderAdminBookings(hotels, visits) {
    const container = document.getElementById('adminBookingsContainer');
    if (!container) return;

    let totalBookings = hotels.length + visits.length;
    document.getElementById('adminTotalBookings').textContent = totalBookings;

    let html = '';

    // Hotel bookings
    hotels.forEach(h => {
        html += `
            <div class="admin-booking-item">
                <div class="booking-info">
                    <p><strong>Hotel:</strong> ${h.hotel_name}</p>
                    <p><strong>Guest:</strong> ${h.guest_name} (${h.email})</p>
                    <p><strong>Check-in:</strong> ${h.check_in} | <strong>Check-out:</strong> ${h.check_out}</p>
                    <p><strong>Revenue:</strong> £${parseFloat(h.total_price).toFixed(2)}</p>
                </div>
                <button class="booking-delete" onclick="deleteAdminBooking('hotel', ${h.id})">Delete</button>
            </div>
        `;
    });

    // Visit bookings
    visits.forEach(v => {
        html += `
            <div class="admin-booking-item">
                <div class="booking-info">
                    <p><strong>Zoo Visit:</strong> ${v.visit_date} @ ${v.visit_time}</p>
                    <p><strong>Visitor:</strong> ${v.name || 'N/A'} (${v.email || 'N/A'})</p>
                    <p><strong>Visitors:</strong> ${v.adults} adults, ${v.children} children, ${v.seniors} seniors</p>
                    <p><strong>Revenue:</strong> £${parseFloat(v.total_price).toFixed(2)}</p>
                </div>
                <button class="booking-delete" onclick="deleteAdminBooking('visit', ${v.id})">Delete</button>
            </div>
        `;
    });

    if (html === '') {
        html = '<p style="text-align:center;color:#666;padding:20px;">No bookings found.</p>';
    }

    container.innerHTML = html;
}

function renderAdminCharts(volumeData, revenueData) {
    // Calculate totals
    let totalRevenue = 0;
    revenueData.forEach(r => {
        totalRevenue += parseFloat(r.revenue || 0);
    });
    document.getElementById('adminTotalRevenue').textContent = '£' + totalRevenue.toFixed(2);

    // Prepare chart data
    const days = [];
    const volumes = [];
    const revenues = [];

    volumeData.forEach(v => {
        days.push(new Date(v.day).toLocaleDateString('en-GB', { month: 'short', day: 'numeric' }));
        volumes.push(v.count);
    });

    revenueData.forEach(r => {
        revenues.push(parseFloat(r.revenue || 0));
    });

    // Ensure we have matching arrays
    const maxLen = Math.max(volumes.length, revenues.length);
    while (volumes.length < maxLen) volumes.push(0);
    while (revenues.length < maxLen) revenues.push(0);
    while (days.length < maxLen) days.push('');

    // Destroy old charts if they exist
    if (adminVolumeChart) adminVolumeChart.destroy();
    if (adminRevenueChart) adminRevenueChart.destroy();

    // Volume Chart
    const volumeCtx = document.getElementById('adminVolumeChart');
    if (volumeCtx) {
        adminVolumeChart = new Chart(volumeCtx, {
            type: 'line',
            data: {
                labels: days,
                datasets: [{
                    label: 'Bookings per Day',
                    data: volumes,
                    borderColor: '#32702A',
                    backgroundColor: 'rgba(50, 112, 42, 0.1)',
                    tension: 0.3,
                    fill: true
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: true,
                plugins: { legend: { display: true } },
                scales: { y: { beginAtZero: true } }
            }
        });
    }

    // Revenue Chart
    const revenueCtx = document.getElementById('adminRevenueChart');
    if (revenueCtx) {
        adminRevenueChart = new Chart(revenueCtx, {
            type: 'bar',
            data: {
                labels: days,
                datasets: [{
                    label: 'Revenue per Day (£)',
                    data: revenues,
                    backgroundColor: '#32702A',
                    borderColor: '#2D5630',
                    borderWidth: 1
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: true,
                plugins: { legend: { display: true } },
                scales: { y: { beginAtZero: true } }
            }
        });
    }
}

function deleteAdminBooking(type, id) {
    if (!confirm(`Are you sure you want to delete this ${type} booking?`)) return;

    const formData = new FormData();
    formData.append('admin_delete_booking', '1');
    formData.append('type', type);
    formData.append('id', id);

    fetch('index.php', { method: 'POST', body: formData })
        .then(r => r.json())
        .then(data => {
            if (data.success) {
                alert('Booking deleted');
                loadAdminData();
            } else {
                alert('Error: ' + (data.error || 'Unknown error'));
            }
        })
        .catch(e => {
            alert('Error deleting booking');
            console.error(e);
        });
}

// Wire admin modal to load data when opened
document.addEventListener('DOMContentLoaded', () => {
    // Auto-check loyalty status on page load (runs after login redirect)
    checkAndUpdateLoyaltyStatus();
    
    // Initialize loyalty displays on page load
    // Initially show "Join" buttons, will update after user data loads if logged in
    updateLoyaltyDisplays(null);
    
    // Check if admin modal exists and hook openModal
    const origOpenModal = window.openModal;
    window.openModal = function(id) {
        if (id === '#adminModal') {
            loadAdminData();
        }
        return origOpenModal.call(this, id);
    };

    // Wire refresh button
    const refreshBtn = document.getElementById('adminRefreshBtn');
    if (refreshBtn) {
        refreshBtn.addEventListener('click', loadAdminData);
    }
});
