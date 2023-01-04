const getConnection = require("../../getConnection");

const insertEnlacesQuery = async (idAutor, texto, foto) => {
  let connection;

  try {
    connection = await getConnection();

    // Creamos el enlace en la base de datos.
    const [newVoto] = await connection.query(
      `
                INSERT INTO tweets (idAutor, texto, foto, createdAt)
                VALUES (?, ?, ?, ?)
            `,
      [idAutor, texto, foto, new Date()]
    );

    // Retornamos el id que le ha asignado MySQL al nuevo enlace.
    return newVoto.insertId;
  } finally {
    if (connection) connection.release();
  }
};

module.exports = insertEnlacesQuery;
