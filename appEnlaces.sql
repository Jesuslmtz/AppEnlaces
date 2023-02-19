DROP DATABASE appEnlaces;

CREATE DATABASE IF NOT EXISTS appEnlaces;
USE appEnlaces;

CREATE TABLE IF NOT EXISTS usuarios (
                id INT UNSIGNED PRIMARY KEY AUTO_INCREMENT,
                email VARCHAR(100) UNIQUE NOT NULL,
                nombreUsuario VARCHAR(100) UNIQUE NOT NULL,
                password VARCHAR(100) NOT NULL, 
                rol  ENUM ('estandar', 'admin') DEFAULT 'estandar',
                foto VARCHAR(100),
                biografia VARCHAR(500),
                createdAt TIMESTAMP  DEFAULT CURRENT_TIMESTAMP,
                modifiedAt TIMESTAMP
                );
                
CREATE TABLE IF NOT EXISTS enlaces (
                id INT UNSIGNED PRIMARY KEY AUTO_INCREMENT,
                idAutor INT UNSIGNED NOT NULL,
                FOREIGN KEY (idAutor) REFERENCES usuarios (id),
                URL VARCHAR(2083) NOT NULL,
                titulo VARCHAR(100) NOT NULL,
                foto VARCHAR(100),
                descripcion VARCHAR(100),
                fecha TIMESTAMP DEFAULT CURRENT_TIMESTAMP
            );
            
CREATE TABLE IF NOT EXISTS votos (
                id INT UNSIGNED PRIMARY KEY AUTO_INCREMENT,
                idAutor INT UNSIGNED NOT NULL,
                FOREIGN KEY (idAutor) REFERENCES usuarios (id),
                idEnlaces INT UNSIGNED NOT NULL,
                FOREIGN KEY (idEnlaces) REFERENCES enlaces (id),
                fecha TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
                unique( idEnlaces, idAutor )
            );
