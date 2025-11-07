<?php
session_start();
// 1. Set the Data Source Name (DSN) for SQLite
// This tells PHP we want to use an SQLite database stored in 'my_database.db'.
// If the file does not exist, SQLite will create it automatically.
$dsn = "sqlite:my_database.db";

// 2. Create a new PDO instance to connect to the database
// PDO (PHP Data Objects) is a modern, secure way to interact with databases.
$pdo = new PDO($dsn);

// 3. Create the 'users' table if it does not already exist
// 'id' is an auto-increment primary key
// 'name' and 'email' are required text fields
// 'password' is a required text field to store hashed passwords
$pdo->exec("
    CREATE TABLE IF NOT EXISTS users (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        name TEXT NOT NULL,
        email TEXT NOT NULL,
        password TEXT NOT NULL,
        isAdmin BOOLEAN DEFAULT 0
    )
");

// 4. Set up example user data
$name = 'john_pork'; // The user's name
$email = 'john@pork.com'; // The user's email address
$password = password_hash('password', PASSWORD_DEFAULT); 
$isAdmin = 1;
// Hash the user's password securely using the recommended algorithm (currently bcrypt)

// 5. Prepare an SQL statement to insert the new user into the 'users' table
// Using prepare() with placeholders prevents SQL injection attacks
$stmt = $pdo->prepare("INSERT INTO users (name, email, password, isAdmin) VALUES (?, ?, ?, ?)");

// 6. Execute the prepared statement with the actual values
// This inserts the user into the table
$stmt->execute([$name, $email, $password, $isAdmin]);

// 7. Print a success message so we know the script ran correctly
echo "Database and starting user table created successfully.\n";
?>
