-- RDA_Website schema for MySQL (phpMyAdmin import)
-- Generated manually to mirror SQLite schema in createDatabase.php

SET FOREIGN_KEY_CHECKS = 0;

-- Users table
CREATE TABLE IF NOT EXISTS `users` (
  `id` INT UNSIGNED NOT NULL AUTO_INCREMENT,
  `name` VARCHAR(255) NOT NULL,
  `email` VARCHAR(255) NOT NULL,
  `password_hash` VARCHAR(255) NOT NULL,
  `phone` VARCHAR(50) DEFAULT NULL,
  `created_at` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  UNIQUE KEY `uk_users_email` (`email`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Hotel bookings
CREATE TABLE IF NOT EXISTS `hotel_bookings` (
  `id` INT UNSIGNED NOT NULL AUTO_INCREMENT,
  `user_id` INT UNSIGNED NOT NULL,
  `hotel_name` VARCHAR(255) NOT NULL,
  `adults` INT NOT NULL,
  `children` INT NOT NULL,
  `check_in` DATE NOT NULL,
  `check_out` DATE NOT NULL,
  `guest_name` VARCHAR(255) NOT NULL,
  `guest_email` VARCHAR(255) NOT NULL,
  `guest_phone` VARCHAR(50) DEFAULT NULL,
  `total_price` DECIMAL(10,2) NOT NULL,
  `nights` INT NOT NULL,
  `payment_method` VARCHAR(100) DEFAULT NULL,
  `status` VARCHAR(50) NOT NULL DEFAULT 'confirmed',
  `created_at` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  KEY `fk_hotel_user` (`user_id`),
  CONSTRAINT `fk_hotel_user` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Visit bookings
CREATE TABLE IF NOT EXISTS `visit_bookings` (
  `id` INT UNSIGNED NOT NULL AUTO_INCREMENT,
  `user_id` INT UNSIGNED NOT NULL,
  `visit_date` DATE NOT NULL,
  `visit_time` VARCHAR(32) NOT NULL,
  `adults` INT NOT NULL,
  `children` INT NOT NULL,
  `seniors` INT NOT NULL,
  `total_price` DECIMAL(10,2) NOT NULL,
  `payment_method` VARCHAR(100) DEFAULT NULL,
  `status` VARCHAR(50) NOT NULL DEFAULT 'confirmed',
  `created_at` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  KEY `fk_visit_user` (`user_id`),
  CONSTRAINT `fk_visit_user` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Loyalty memberships
CREATE TABLE IF NOT EXISTS `loyalty_memberships` (
  `id` INT UNSIGNED NOT NULL AUTO_INCREMENT,
  `user_id` INT UNSIGNED NOT NULL,
  `tier` VARCHAR(64) NOT NULL,
  `start_date` DATE NOT NULL,
  `expires_date` DATE DEFAULT NULL,
  `total_price` DECIMAL(10,2) NOT NULL,
  `payment_method` VARCHAR(100) DEFAULT NULL,
  `active` TINYINT(1) NOT NULL DEFAULT 1,
  `status` VARCHAR(50) NOT NULL DEFAULT 'confirmed',
  `created_at` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  KEY `fk_loyalty_user` (`user_id`),
  CONSTRAINT `fk_loyalty_user` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

SET FOREIGN_KEY_CHECKS = 1;

-- End of schema
