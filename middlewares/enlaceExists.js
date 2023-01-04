const getConnection = require("../bbdd/getConnection");

const { generateError } = require("../helpers");

const enlaceExists = async (req, res, next) => {
  let connection;

  try {
    connection = await getConnection();

    const { idEnlaces } = req.params;

    // Comprobamos que el enlace exista.
    const [enlaces] = await connection.query(
      `SELECT * FROM enlaces WHERE id = ?`,
      [idEnlaces]
    );

    if (enlaces.length < 1) {
      throw generateError("Enlace no encontrado", 404);
    }

    // Pasamos el control a la siguiente función controladora.
    next();
  } catch (err) {
    next(err);
  } finally {
    if (connection) connection.release();
  }
};

module.exports = enlaceExists;
