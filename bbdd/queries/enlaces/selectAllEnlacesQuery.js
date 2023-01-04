const getConnection = require("../../getConnection");

const selectAllEnlacesQuery = async (idAutor, clave = "") => {
  let connection;

  try {
    connection = await getConnection();

    // Obtenemos el listado de enlaces.
    const [enlaces] = await connection.query(
      `
                SELECT 
                    E.id, 
                    E.idAutor, 
                    E.texto, 
                    E.foto, 
                    COUNT(V.id) AS votos,
                    BIT_OR(V.idAutor = ?) AS VotadosPorMi,
                    E.idAutor = ? AS owner,
                    E.createdAt
                FROM enlaces E
                LEFT JOIN votos V ON E.id = V.idEnlaces
                WHERE E.texto LIKE ?
                GROUP BY E.id
                ORDER BY E.createdAt DESC
            `,
      [idAutor, idAutor, `%${clave}%`]
    );

    return enlaces;
  } finally {
    if (connection) connection.release();
  }
};

module.exports = selectAllEnlacesQuery;
