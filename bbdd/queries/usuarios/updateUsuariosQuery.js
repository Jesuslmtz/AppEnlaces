const getConnection = require("../../getConnection");

const updateUsuariosQuery = async (email, foto, idUsuarios) => {
  let connection;

  try {
    connection = await getConnection();

    // Actualizamos los datos del usuario.
    await connection.query(
      `UPDATE usuarios SET email = ?, foto = ?, modifiedAt = ? WHERE id = ?`,
      [email, foto, new Date(), idUsuarios]
    );
  } finally {
    if (connection) connection.release();
  }
};

module.exports = updateUsuariosQuery;
