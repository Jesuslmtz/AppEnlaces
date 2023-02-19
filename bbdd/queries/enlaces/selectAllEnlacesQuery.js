const getConnection = require("../../getConnection");

const selectAllEnlacesQuery = async (idUsuarioActual, clave = "") => {
  let connection;

  try {
    connection = await getConnection();

    const query = `
    SELECT 
      E.id,
      E.idAutor,
      E.descripcion,
      E.titulo,
      E.foto,
      E.URL,
      COUNT(V.id) AS votos,
      BIT_OR(V.idAutor = ?) AS VotadosPorMi,
      E.fecha,
      U.nombreUsuario
    FROM 
      enlaces E
    INNER JOIN 
      usuarios U ON U.id = E.idAutor
    LEFT JOIN votos V ON E.id = V.idEnlaces
    WHERE E.descripcion LIKE ?
    GROUP BY E.id
    ORDER BY E.fecha DESC
        `;
    const params = [idUsuarioActual, `%${clave}%`];

    // Obtenemos el listado de enlaces.
    const [enlaces] = await connection.query(
      query,
      params
    );

    return enlaces;
  } finally {
    if (connection) connection.release();
  }
};

module.exports = selectAllEnlacesQuery;
