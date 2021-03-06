DROP DATABASE IF EXISTS app;
CREATE DATABASE app CHARACTER SET utf8 COLLATE utf8_general_ci;
USE app;

CREATE TABLE User (
  id INTEGER PRIMARY KEY AUTO_INCREMENT,
  username VARCHAR(255) NOT NULL,
  displayName VARCHAR(300) NOT NULL,
  password VARCHAR(500) NULL,
  facebookId BIGINT NULL,
  facebookName VARCHAR(500) NULL,
  facebookShortName VARCHAR(300) NULL,
  facebookPicture VARCHAR(500) NULL,
  facebookEmail VARCHAR(255) NULL,
  createdBy INTEGER NULL,
  createdAt BIGINT NOT NULL,
  updatedAt BIGINT NULL,
  CONSTRAINT User_fk_createdBy FOREIGN KEY (createdBy) REFERENCES User (id) ON DELETE CASCADE ON UPDATE CASCADE
);

CREATE UNIQUE INDEX User_uk_username ON User (username);
CREATE UNIQUE INDEX User_uk_facebookId ON User (facebookId);
CREATE UNIQUE INDEX User_uk_facebookEmail ON User (facebookEmail);


CREATE TABLE Plate (
  id INTEGER PRIMARY KEY AUTO_INCREMENT,
  plate VARCHAR(10) NOT NULL,
  createdBy INTEGER NULL,
  createdAt BIGINT NOT NULL,
  updatedAt BIGINT NULL,
  CONSTRAINT Plate_fk_createdBy FOREIGN KEY (createdBy) REFERENCES User (id) ON DELETE CASCADE ON UPDATE CASCADE
);

CREATE UNIQUE INDEX Plate_uk_plate ON Plate (plate);


CREATE TABLE Release_cell (
  id INTEGER PRIMARY KEY AUTO_INCREMENT,
  cell VARCHAR(2) NOT NULL,
  release_date DATE NOT NULL,
  suscriptor_id INTEGER NULL,
  createdBy INTEGER NULL,
  createdAt BIGINT NOT NULL,
  updatedAt BIGINT NULL,
  CONSTRAINT Release_cell_fk_createdBy FOREIGN KEY (createdBy) REFERENCES User (id) ON DELETE CASCADE ON UPDATE CASCADE
);

CREATE UNIQUE INDEX Release_uk_plate ON Release_cell(cell, release_date);


CREATE TABLE Subscription (
  id INTEGER PRIMARY KEY AUTO_INCREMENT,
  createdBy INTEGER NULL,
  createdAt BIGINT NOT NULL,
  updatedAt BIGINT NULL,
  CONSTRAINT Subscription_fk_createdBy FOREIGN KEY (createdBy) REFERENCES User (id) ON DELETE CASCADE ON UPDATE CASCADE
);

