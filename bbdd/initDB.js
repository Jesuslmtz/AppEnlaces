// El método "config" localiza el fichero ".env" que hayamos creado en la raíz
// del proyecto y pone disponibles las variables que figuren en ese fichero en
// el listado de variables de entorno.
require('dotenv').config();

// Dependencia que permite encriptar contraseñas.
const bcrypt = require('bcrypt');

const getConnection = require('./getConnection');

async function main() {
    // Variable que almacenará una conexión libre con la base de datos.
    let connection;

    try {
        connection = await getConnection();

        console.log('Borrando tablas...');
        await connection.query(`DROP TABLE IF EXISTS votos`);
        await connection.query(`DROP TABLE IF EXISTS enlaces`);
        await connection.query(`DROP TABLE IF EXISTS usuarios`);
        

        console.log('Creando tablas...');

        await connection.query(`
        CREATE TABLE IF NOT EXISTS usuarios (
            id INT UNSIGNED PRIMARY KEY AUTO_INCREMENT,
            email VARCHAR(100) UNIQUE NOT NULL,
            rol  ENUM ('estandar', 'admin') DEFAULT 'estandar',
            password VARCHAR(100) NOT NULL, 
            foto VARCHAR(100),
            biografia VARCHAR(500),
            createdAt TIMESTAMP  DEFAULT CURRENT_TIMESTAMP,
            modifiedAt TIMESTAMP
            )
            `);

        await connection.query(`
        CREATE TABLE IF NOT EXISTS enlaces (
            id INT UNSIGNED PRIMARY KEY AUTO_INCREMENT,
            idAutor INT UNSIGNED NOT NULL,
            FOREIGN KEY (idAutor) REFERENCES usuarios (id),
            URL VARCHAR(2083) NOT NULL,
            titulo VARCHAR(100) NOT NULL,
            descripcion VARCHAR(100),
            fecha TIMESTAMP DEFAULT CURRENT_TIMESTAMP
        )
        `);

        await connection.query(`
        CREATE TABLE IF NOT EXISTS votos (
            id INT UNSIGNED PRIMARY KEY AUTO_INCREMENT,
            idAutor INT UNSIGNED NOT NULL,
            FOREIGN KEY (idAutor) REFERENCES usuarios (id),
            idEnlaces INT UNSIGNED NOT NULL,
            FOREIGN KEY (idEnlaces) REFERENCES enlaces (id),
            fecha TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
            valoracion ENUM ('util', 'prescindible') DEFAULT 'util',
            unique( idEnlaces, idAutor )
        )
        `);
       
        console.log('Tablas creadas...');

        // Encriptamos la contraseña del administrador.
        const adminPassword = await bcrypt.hash('123456', 10);

        await connection.query(
            `
                INSERT INTO usuarios (email, password, rol, createdAt)
                VALUES ('admin@admin.com', ?,'admin', ?)
            `,
            [adminPassword, new Date()]
        );

        console.log('Usuario administrador creado...');

        console.log('¡Base de datos finalizada!');
    } catch (err) {
        console.error(err);
    } finally {
        // Liberamos una conexión ocupada (si la hay).
        if (connection) connection.release();

        // Cerramos el proceso.
        process.exit();
    }
}

main();
