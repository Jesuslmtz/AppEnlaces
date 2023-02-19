const getConnection = require("../../getConnection");

const updateUsuarioPasswordQuery = async (password, idUsuario) => {
  let connection;

  try {
    connection = await getConnection();

    // Actualizamos los datos del usuario.
    await connection.query(
      `UPDATE usuarios SET password = ?, modifiedAt = ? WHERE id = ?`,
      [password, new Date(), idUsuario]
    );
  } finally {
    if (connection) connection.release();
  }
};

module.exports = updateUsuarioPasswordQuery;
