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
   MODAL SYSTEM
============================================================ */
const modalButtons = document.querySelectorAll('[data-modal-target]');
const modals = document.querySelectorAll('.modal');
const closeButtons = document.querySelectorAll('[data-close]');
const switchLinks = document.querySelectorAll('[data-switch]');

function openModal(id) {
    document.querySelector(id).classList.add('active');
}
function closeModal(modal) {
    modal.classList.remove('active');
}

/* Open modal buttons */
modalButtons.forEach(btn => {
    btn.addEventListener('click', () => {
        const target = btn.getAttribute('data-modal-target');
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

/* Close modal when clicking outside */
modals.forEach(modal => {
    modal.addEventListener('click', (e) => {
        if (e.target === modal) closeModal(modal);
    });
});

/* ============================================================
   LOGIN / SIGNUP (DEMO MODE — ALWAYS SUCCEEDS)
============================================================ */
document.querySelector('#loginForm').addEventListener('submit', (e) => {
    e.preventDefault();
    alert("Logged in successfully! (Demo Mode)");
    closeModal(document.querySelector('#loginModal'));
});

document.querySelector('#signupForm').addEventListener('submit', (e) => {
    e.preventDefault();
    alert("Account created! (Demo Mode)");
    closeModal(document.querySelector('#signupModal'));
});

/* ============================================================
   BOOKING FLOW + INTERACTIVE CALENDAR
============================================================ */
let checkInDate = null;
let checkOutDate = null;

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
                day.classList.add('selected');
            } else if (!checkOutDate) {
                checkOutDate = date;
                day.classList.add('selected');
            } else {
                /* Reset if selecting again */
                checkInDate = date;
                checkOutDate = null;
                document
                    .querySelectorAll('.calendar-day')
                    .forEach(d => d.classList.remove('selected'));
                day.classList.add('selected');
            }
        });
    });
}

/* ON CLICK “Choose Dates” */
document.querySelector('[data-modal-target="#calendarModal"]').addEventListener('click', () => {
    renderCalendar();
});

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
    closeModal(document.querySelector('#visitorModal'));
    openModal('#paymentModal');
});

/* PAYMENT — Auto Success */
document.getElementById('payBtn').addEventListener('click', () => {
    closeModal(document.querySelector('#paymentModal'));
    openModal('#confirmationModal');

    const confirmationBox = document.getElementById('confirmationDetails');
    confirmationBox.innerHTML = `
        <p><strong>Booking Confirmed!</strong></p>
        <p>Check-In: ${checkInDate}</p>
        <p>Check-Out: ${checkOutDate}</p>
        <p>Your visit has been scheduled. A confirmation email is on its way.</p>
    `;
});
