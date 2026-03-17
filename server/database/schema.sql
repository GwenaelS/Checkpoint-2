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
  status ENUM('To Do', 'In Progress', 'Done') DEFAULT 'To Do',
  created_by INT UNSIGNED NOT NULL,
  FOREIGN KEY(created_by) REFERENCES user(id)
);

CREATE TABLE user_project (
  user_id INT UNSIGNED NOT NULL,
  project_id INT UNSIGNED NOT NULL,
  PRIMARY KEY (user_id, project_id),
  FOREIGN KEY(user_id) REFERENCES user(id),
  FOREIGN KEY(project_id) REFERENCES project(id)
);

CREATE TABLE task (
  id INT UNSIGNED PRIMARY KEY AUTO_INCREMENT NOT NULL,
  title VARCHAR(255) NOT NULL,
  description TEXT,
  status ENUM('To Do', 'In Progress', 'Done') DEFAULT 'To Do',
  user_id INT UNSIGNED NOT NULL,
  project_id INT UNSIGNED NOT NULL,
  FOREIGN KEY(user_id) REFERENCES user(id),
  FOREIGN KEY(project_id) REFERENCES project(id)
);

INSERT INTO user(id, username, email, password) VALUES (1, "zenji", "zenji@mail.com", "123456");
INSERT INTO project(id, title, description, created_by) VALUES (1, "Project 1", "Description for Project 1", 1);
