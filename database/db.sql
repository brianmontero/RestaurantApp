CREATE DATABASE restaurant;

USE restaurant;

CREATE TABLE clients (
    client_id INT NOT NULL AUTO_INCREMENT,
    username VARCHAR(30) NOT NULL,
    email VARCHAR(60),
    client_password VARCHAR(30) NOT NULL,
    role VARCHAR(5),
    PRIMARY KEY (client_id)
);

CREATE TABLE favorites (
    client_id INT NOT NULL,
    menu_id INT NOT NULL,
    FOREIGN KEY (client_id) REFERENCES clients(client_id)
);

CREATE TABLE menus (
    menu_id INT NOT NULL PRIMARY KEY AUTO_INCREMENT,
    title VARCHAR(60) NOT NULL,
    ingredients JSON NOT NULL,
    menu_description TEXT NOT NULL,
    price INT NOT NULL,
    category VARCHAR(20) NOT NULL,
    image VARCHAR(200) NOT NULL
);

CREATE TABLE ratings (
    client_id INT NOT NULL,
    menu_id INT NOT NULL,
    stars INT NOT NULL,
    comment TEXT,
    FOREIGN KEY (client_id) REFERENCES clients(client_id),
    FOREIGN KEY (menu_id) REFERENCES menus(menu_id)
);

CREATE TABLE sales (
    client_id INT NOT NULL,
    amount INT NOT NULL,
    total INT NOT NULL,
    date TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
);