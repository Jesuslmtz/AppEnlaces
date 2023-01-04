const getConnection = require("../../getConnection");

const { generateError } = require("../../../helpers");

const selectUsuariosByEmailQuery = async (email) => {
  let connection;

  try {
    connection = await getConnection();

    // Tratamos de obtener al usuario con el email que venga en el body.
    const [usuarios] = await connection.query(
      `SELECT id, rol, contraseña FROM usuarios WHERE email = ?`,
      [email]
    );

    // Si el array de usuarios está vacío quiere decir que no hay ningún usuario
    // con ese email. Lanzamos un error.
    if (usuarios.length < 1) {
      throw generateError("Usuario no encontrado", 404);
    }

    // Dado que no puede existir más de un usuario con un email en caso de que el
    // array de usuarios encuentre a un usuario este estará en la posición 0 del array.
    return usuarios[0];
  } finally {
    if (connection) connection.release();
  }
};

module.exports = selectUsuariosByEmailQuery;
