-- Hackaton FP RepoProjects
-- schema.sql
-- Ejecutar este script completo en MySQL 8+

DROP DATABASE IF EXISTS fp_repoprojects;
CREATE DATABASE fp_repoprojects
  CHARACTER SET utf8mb4
  COLLATE utf8mb4_unicode_ci;

USE fp_repoprojects;

CREATE TABLE users (
  id BIGINT UNSIGNED NOT NULL AUTO_INCREMENT,
  full_name VARCHAR(120) NOT NULL,
  email VARCHAR(160) NOT NULL,
  password_hash VARCHAR(255) NOT NULL,
  role ENUM('ALUMNO', 'DOCENTE', 'ADMIN') NOT NULL,
  created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (id),
  UNIQUE KEY uq_users_email (email),
  KEY idx_users_role (role)
) ENGINE=InnoDB;

CREATE TABLE projects (
  id BIGINT UNSIGNED NOT NULL AUTO_INCREMENT,
  titulo VARCHAR(180) NOT NULL,
  descripcion TEXT NOT NULL,
  ciclo ENUM('DAM', 'ASIR') NOT NULL,
  curso_academico VARCHAR(9) NOT NULL,
  tecnologias VARCHAR(255) NOT NULL,
  repositorio_url VARCHAR(255) NOT NULL,
  demo_url VARCHAR(255) NULL,
  estado ENUM('BORRADOR', 'PENDIENTE', 'PUBLICADO', 'RECHAZADO') NOT NULL DEFAULT 'BORRADOR',
  autor_id BIGINT UNSIGNED NOT NULL,
  fecha_creacion TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  fecha_actualizacion TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (id),
  CONSTRAINT fk_projects_autor
    FOREIGN KEY (autor_id)
    REFERENCES users (id)
    ON DELETE RESTRICT
    ON UPDATE CASCADE,
  KEY idx_projects_estado (estado),
  KEY idx_projects_ciclo (ciclo),
  KEY idx_projects_curso (curso_academico),
  KEY idx_projects_autor (autor_id)
) ENGINE=InnoDB;
