-- database.sql

CREATE DATABASE hospital_management;

USE hospital_management;

CREATE TABLE hospital (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(255) NOT NULL
);

CREATE TABLE psychiatrist (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    patient_count INT DEFAULT 0,
    hospital_id INT,
    FOREIGN KEY (hospital_id) REFERENCES hospital(id)
);

CREATE TABLE patient (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    address VARCHAR(255) NOT NULL CHECK (CHAR_LENGTH(address) >= 10),
    email VARCHAR(255) NOT NULL,
    phone_number VARCHAR(20) NOT NULL ,
    password VARCHAR(255) NOT NULL,
    photo BLOB NOT NULL,
    psychiatrist_id INT,
    FOREIGN KEY (psychiatrist_id) REFERENCES psychiatrist(id)
);

INSERT INTO hospital (name) VALUES
('Apollo Hospitals'),
('Jawaharlal Nehru Medical College and Hospital'),
('Indira Gandhi Institute of Medical Sciences (IGIMS)'),
('AIIMS - All India Institute Of Medical Science');

-- Add sample data for psychiatrists and patients
