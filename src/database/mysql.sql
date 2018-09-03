DROP DATABASE IF EXISTS app;
CREATE DATABASE app CHARACTER SET utf8 COLLATE utf8_general_ci;
USE app;

CREATE TABLE User (
  id INTEGER PRIMARY KEY AUTO_INCREMENT,
  username VARCHAR(255) NOT NULL,
  displayName VARCHAR(300) NOT NULL,
  password VARCHAR(500) NULL,
  facebookId INTEGER NULL,
  facebookName VARCHAR(500) NULL,
  facebookShortName VARCHAR(300) NULL,
  facebookPicture VARCHAR(500) NULL,
  facebookEmail VARCHAR(255) NULL,
  createdBy INTEGER NULL,
  createdAt BIGINT NOT NULL,
  updatedAt BIGINT NULL
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
