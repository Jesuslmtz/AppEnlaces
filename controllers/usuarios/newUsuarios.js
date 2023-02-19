const insertUsuariosQuery = require("../../bbdd/queries/usuarios/insertUsuariosQuery");

const { generateError } = require("../../helpers");

const newUsuarios = async (req, res, next) => {
  try {
    // Obtenemos  los datos necesarios.
    const { email, nombreUsuario, password } = req.body;

    // Si falta algún dato lanzamos un error.
    if (!email || !nombreUsuario || !password) {
      throw generateError("Faltan campos", 400);
    }

    // Creamos el usuario.
    await insertUsuariosQuery(email, nombreUsuario, password);

    res.send({
      status: "ok",
      message: "Usuario creado",
    });
  } catch (err) {
    next(err);
  }
};

module.exports = newUsuarios;
