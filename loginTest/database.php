<?php
$dsn = "mysql:host=localhost;dbname=gurtbase;charset=utf8mb4";
$dbUser = "your_db_username";   // replace with your DB username
$dbPass = "your_db_password";   // replace with your DB password

try {
    // Connect to database
    $pdo = new PDO($dsn, $dbUser, $dbPass);
    $pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);

    // SQL to create table
    $sql = "CREATE TABLE IF NOT EXISTS User (
                userID INT(11) NOT NULL AUTO_INCREMENT,
                userEmail VARCHAR(255) NOT NULL,
                userPass VARCHAR(255) NOT NULL,
                userFirstName VARCHAR(100) NOT NULL,
                userLastName VARCHAR(100) NOT NULL,
                PRIMARY KEY (userID),
                UNIQUE (userEmail)
            ) ENGINE=InnoDB;";

    // Execute query
    $pdo->exec($sql);

    echo "Table 'User' created successfully!";
} catch (PDOException $e) {
    echo "Error: " . $e->getMessage();
}
?>
