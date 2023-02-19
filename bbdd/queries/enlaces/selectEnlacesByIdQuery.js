const getConnection = require("../../getConnection");

const selectEnlacesByIdQuery = async (idAutor, idEnlaces) => {
  let connection;

  try {
    connection = await getConnection();

    const [enlaces] = await connection.query(
      `
                SELECT 
                    E.id, 
                    E.idAutor, 
                    E.descripcion, 
                    E.titulo,
                    E.foto,
                    E.URL,
                    COUNT(V.id) AS votos,
                    BIT_OR(V.idAutor = ?) AS votadosPorMi,
                    E.idAutor = ? AS owner,
                    E.fecha,
                    U.nombreUsuario
                FROM enlaces E
                INNER JOIN 
                  usuarios U ON U.id = E.idAutor
                LEFT JOIN votos V ON E.id = V.idEnlaces
                WHERE E.id = ?
                GROUP BY E.id
                ORDER BY E.fecha DESC
            `,
      [idAutor, idAutor, idEnlaces]
    );

    
    return enlaces;
  } finally {
    if (connection) connection.release();
  }
};

module.exports = selectEnlacesByIdQuery;
