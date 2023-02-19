const getConnection = require("../../getConnection");

const updateUsuariosQuery = async (email, nombreUsuario, foto, idUsuario) => {
  let connection;

  try {
    connection = await getConnection();

    let query, params;

    if (foto) {
      query = `UPDATE usuarios SET email = ?, nombreUsuario = ?, foto = ?, modifiedAt = ? WHERE id = ?`;
      params = [email, nombreUsuario, foto, new Date(), idUsuario];
    }
    else {
      query = `UPDATE usuarios SET email = ?, nombreUsuario = ?, modifiedAt = ? WHERE id = ?`;
      params = [email, nombreUsuario, new Date(), idUsuario];
    }

    // Actualizamos los datos del usuario.
    await connection.query(query, params);
  } finally {
    if (connection) connection.release();
  }
};

module.exports = updateUsuariosQuery;
