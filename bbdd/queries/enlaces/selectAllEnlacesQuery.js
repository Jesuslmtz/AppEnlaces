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
                    E.descripcion, 
                    E.foto, 
                    COUNT(V.id) AS votos,
                    BIT_OR(V.idAutor = ?) AS VotadosPorMi,
                    E.idAutor = ? AS owner,
                    E.fecha
                FROM enlaces E
                LEFT JOIN votos V ON E.id = V.idEnlaces
                WHERE E.descripcion LIKE ?
                GROUP BY E.id
                ORDER BY E.fecha DESC
            `,
      [idAutor, idAutor, `%${clave}%`]
    );

    return enlaces;
  } finally {
    if (connection) connection.release();
  }
};

module.exports = selectAllEnlacesQuery;
