const getConnection = require("../../getConnection");

const { generateError } = require("../../../helpers");

const deleteVotosQuery = async (idAutor, idEnlaces) => {
  let connection;

  try {
    connection = await getConnection();

    // Comprobamos que el usuario haya votado al enlace.
    const [votos] = await connection.query(
      `SELECT id FROM votos WHERE idAutor = ? AND idEnlaces = ?`,
      [idAutor, idEnlaces]
    );

    if (votos.length < 1) {
      throw generateError("voto no encontrado", 404);
    }

    await connection.query(
      `DELETE FROM votos WHERE idAutor = ? AND idEnlaces = ?`,
      [idAutor, idEnlaces]
    );
  } finally {
    if (connection) connection.release();
  }
};

module.exports = deleteVotosQuery;
