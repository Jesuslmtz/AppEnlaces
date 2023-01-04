const getConnection = require("../../getConnection");

const { generateError } = require("../../../helpers");

const insertVotosQuery = async (idAutor, idEnlaces) => {
  let connection;

  try {
    connection = await getConnection();

    // Comprobamos si el usuario ya ha votado al enlace.
    const [votos] = await connection.query(
      `SELECT id FROM votos WHERE idAutor = ? AND idEnlaces = ?`,
      [idAutor, idEnlaces]
    );

    if (votos.length > 0) {
      throw generateError("No puedes votar dos veces el mismo enlace", 403);
    }

    await connection.query(
      `INSERT INTO votos (idAutor, idEnlaces, createdAt) VALUES (?, ?, ?)`,
      [idAutor, idEnlaces, new Date()]
    );
  } finally {
    if (connection) connection.release();
  }
};

module.exports = insertVotosQuery;
