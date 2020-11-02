DROP DATABASE IF EXISTS ds9_db;

CREATE DATABASE ds9_db;

USE ds9_db;

CREATE TABLE organization (
  id INT NOT NULL AUTO_INCREMENT,
  org_name VARCHAR(30),
  PRIMARY KEY (id)
);

CREATE TABLE role (
  id INT NOT NULL AUTO_INCREMENT,
  title VARCHAR(30),
  salary DECIMAL(10,2) NOT NULL,
  org_id INT NOT NULL,
  PRIMARY KEY (id),
  FOREIGN KEY (org_id) REFERENCES organization(id)
);

CREATE TABLE employee (
  id INT NOT NULL AUTO_INCREMENT,
  first_name VARCHAR(30),
  last_name VARCHAR(30),
  role_id INT NOT NULL,
  manager_id INT,
  PRIMARY KEY (id),
  FOREIGN KEY (role_id) REFERENCES role(id),
  FOREIGN KEY (manager_id) REFERENCES employee(id)
);
