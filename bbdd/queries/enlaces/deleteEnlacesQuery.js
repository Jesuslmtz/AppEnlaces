const getConnection = require("../../getConnection");

const { generateError } = require("../../../helpers");

const deleteEnlacesQuery = async (idUsuarios, idEnlaces) => {
  let connection;

  try {
    connection = await getConnection();

    // Seleccionamos el enlace.
    const [enlaces] = await connection.query(
      `SELECT idUsuarios FROM enlaces WHERE idAutor = ?`,
      [idAutor]
    );

    // Comprobamos si la persona que está intentando eliminar el voto
    // es la propietaria del enlace.
    if (enlaces[0].idAutor !== idAutor) {
      throw generateError("No tienes suficientes permisos", 401);
    }

    // Borramos todos los votos relacionados con el enlace que queremos
    // eliminar.
    await connection.query(`DELETE FROM votos WHERE idEnlaces = ?`, [
      idEnlaces,
    ]);

    // Borramos el enlace.
    await connection.query(`DELETE FROM enlaces WHERE id = ?`, [idEnlaces]);
  } finally {
    if (connection) connection.release();
  }
};

module.exports = deleteEnlacesQuery;
