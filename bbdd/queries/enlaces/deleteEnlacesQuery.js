const getConnection = require("../../getConnection");

const { generateError } = require("../../../helpers");

const deleteEnlacesQuery = async (idAutor, idEnlaces) => {
  let connection;

  try {
    connection = await getConnection();

    // Seleccion del enlace.
    const [enlaces] = await connection.query(
      `SELECT idAutor FROM enlaces WHERE id = ?`,
      [idEnlaces]
    );

    if (!enlaces.length) {
      throw generateError("No existe", 404);
    }

    let enlace = enlaces[0]

    // Comprobamos si la persona que está intentando eliminar el voto
    // es la propietaria del enlace.

    if (enlace.idAutor !== idAutor) {
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
