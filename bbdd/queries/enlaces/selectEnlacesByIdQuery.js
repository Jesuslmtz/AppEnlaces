const getConnection = require("../../getConnection");

const selectEnlacesByIdQuery = async (idAutor, idEnlaces) => {
  let connection;

  try {
    connection = await getConnection();

    const [tweets] = await connection.query(
      `
                SELECT 
                    E.id, 
                    E.idAutor, 
                    E.texto, 
                    E.foto, 
                    COUNT(V.id) AS votos,
                    BIT_OR(V.idAutor = ?) AS votadosPorMi,
                    E.idAutor = ? AS owner,
                    E.createdAt
                FROM enlaces E
                LEFT JOIN votos V ON E.id = V.idEnlaces
                WHERE E.id = ?
                GROUP BY E.id
                ORDER BY E.createdAt DESC
            `,
      [idAutor, idAutor, idEnlaces]
    );

    return tweets[0];
  } finally {
    if (connection) connection.release();
  }
};

module.exports = selectEnlacesByIdQuery;
