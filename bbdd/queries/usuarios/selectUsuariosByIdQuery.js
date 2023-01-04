const getConnection = require("../../getConnection");

const { generateError } = require("../../../helpers");

const selectUsuariosByIdQuery = async (idUsuarios) => {
  let connection;

  try {
    connection = await getConnection();

    // Obtenemos los datos del usuario que me interesan.
    const [usuarios] = await connection.query(
      `SELECT id, email, foto, rol, createdAt FROM usuarios WHERE id = ?`,
      [idUsuarios]
    );

    // Si no existe ningún usuario lanzamos un error.
    if (usuarios.length < 1) {
      throw generateError("Usuario no encontrado", 404);
    }

    return usuarios[0];
  } finally {
    if (connection) connection.release();
  }
};

module.exports = selectUsuariosByIdQuery;
