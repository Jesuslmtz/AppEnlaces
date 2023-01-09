const getConnection = require("../../getConnection");

const insertEnlacesQuery = async (titulo, descripcion, URL, image, idAutor) => {
  let connection;

  try {
    connection = await getConnection();

    // Creamos el enlace en la base de datos.
    const [newVoto] = await connection.query(
      `
                INSERT INTO enlaces (idAutor, URL, titulo, descripcion, foto)
                VALUES (?, ?, ?, ?, ?)
            `,
      [idAutor, URL, titulo, descripcion, image]
    );

    // Retornamos el id que le ha asignado MySQL al nuevo enlace.
    return newVoto.insertId;
  } finally {
    if (connection) connection.release();
  }
};

module.exports = insertEnlacesQuery;
