CREATE DATABASE IF NOT EXISTS checkpoint2;
USE checkpoint2;

CREATE TABLE user (
  id INT UNSIGNED PRIMARY KEY AUTO_INCREMENT NOT NULL,
  username VARCHAR(50),
  email VARCHAR(255) NOT NULL UNIQUE,
  password VARCHAR(255) NOT NULL
);

CREATE TABLE project (
  id INT UNSIGNED PRIMARY KEY AUTO_INCREMENT NOT NULL,
  title VARCHAR(255) NOT NULL,
  description TEXT,
  status ENUM('To Do', 'In Progress', 'Done'),
  created_by INT UNSIGNED NOT NULL,
  foreign key(created_by) REFERENCES user(id)
);

CREATE TABLE task (
  id INT UNSIGNED PRIMARY KEY AUTO_INCREMENT NOT NULL,
  title VARCHAR(255) NOT NULL,
  description TEXT,
  status ENUM('To Do', 'In Progress', 'Done'),
  user_id INT UNSIGNED NOT NULL,
  project_id INT UNSIGNED NOT NULL,
  foreign key(user_id) REFERENCES user(id),
  foreign key(project_id) REFERENCES project(id)
);

INSERT INTO user(id, username, email, password) VALUES (1, "zenji", "zenji@mail.com", "123456");
