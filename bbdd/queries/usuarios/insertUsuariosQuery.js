const getConnection = require("../../getConnection");

const bcrypt = require("bcrypt");

const { generateError } = require("../../../helpers");

const insertUsuariosQuery = async (email, contraseña) => {
  let connection;

  try {
    connection = await getConnection();

    // Intentamos obtener a un usuario con el email dado.
    const [usuarios] = await connection.query(
      `SELECT id FROM usuarios WHERE email = ?`,
      [email]
    );

    // Si existe algún usuario con ese email lanzamos un error.
    if (usuarios.length > 0) {
      throw generateError("Ya existe un usuario con ese email", 403);
    }

    // Encriptamos la contraseña.
    const hashedPassword = await bcrypt.hash(password, 10);

    // Creamos el usuario en la base de datos.
    await connection.query(
      `INSERT INTO usuarios (email, contraseña , createdAt) VALUES (?, ?, ?)`,
      [email, hashedPassword, new Date()]
    );
  } finally {
    if (connection) connection.release();
  }
};

module.exports = insertUsuariosQuery;
