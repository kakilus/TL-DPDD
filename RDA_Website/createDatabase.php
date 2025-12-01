<?php
$db = new PDO('sqlite:zoo.db');
$db->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);

/* USERS TABLE */
$db->exec("
    CREATE TABLE IF NOT EXISTS users (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        name TEXT NOT NULL,
        email TEXT NOT NULL UNIQUE,
        password_hash TEXT NOT NULL,
        phone TEXT,
        created_at TEXT DEFAULT CURRENT_TIMESTAMP
    );
");


/* HOTEL BOOKINGS */
$db->exec("
    CREATE TABLE IF NOT EXISTS hotel_bookings (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        user_id INTEGER NOT NULL,
        hotel_name TEXT NOT NULL,
        adults INTEGER NOT NULL,
        children INTEGER NOT NULL,
        check_in TEXT NOT NULL,
        check_out TEXT NOT NULL,
        guest_name TEXT NOT NULL,
        guest_email TEXT NOT NULL,
        guest_phone TEXT,
        total_price REAL NOT NULL,
        nights INTEGER NOT NULL,
        payment_method TEXT,
        status TEXT DEFAULT 'confirmed',
        created_at TEXT DEFAULT CURRENT_TIMESTAMP,
        FOREIGN KEY (user_id) REFERENCES users(id)
    );
");


/* ZOO VISIT BOOKINGS */
$db->exec("
    CREATE TABLE IF NOT EXISTS visit_bookings (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        user_id INTEGER NOT NULL,
        visit_date TEXT NOT NULL,
        visit_time TEXT NOT NULL,
        adults INTEGER NOT NULL,
        children INTEGER NOT NULL,
        seniors INTEGER NOT NULL,
        total_price REAL NOT NULL,
        payment_method TEXT,
        status TEXT DEFAULT 'confirmed',
        created_at TEXT DEFAULT CURRENT_TIMESTAMP,
        FOREIGN KEY (user_id) REFERENCES users(id)
    );
");


/* LOYALTY MEMBERSHIPS */
$db->exec("
    CREATE TABLE IF NOT EXISTS loyalty_memberships (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        user_id INTEGER NOT NULL,
        tier TEXT NOT NULL,
        start_date TEXT NOT NULL,
        expires_date TEXT,
        total_price REAL NOT NULL,
        payment_method TEXT,
        active INTEGER DEFAULT 1,
        status TEXT DEFAULT 'confirmed',
        created_at TEXT DEFAULT CURRENT_TIMESTAMP,
        FOREIGN KEY (user_id) REFERENCES users(id)
    );
");

echo "Database created successfully!";
