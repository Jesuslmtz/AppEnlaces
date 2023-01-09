const selectUsuariosByEmailQuery = require("../../bbdd/queries/usuarios/selectUsuariosByEmailQuery");

const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

const { generateError } = require("../../helpers");

const loginUsuarios = async (req, res, next) => {
  try {
    // Obtenemos los datos necesarios.
    const { email, password } = req.body;

    // Si falta algún dato lanzamos un error.
    if (!email || !password) {
      throw generateError("Faltan campos", 400);
    }

    // Localizamos al usuario con el email del body.
    const Usuarios = await selectUsuariosByEmailQuery(email);

    // Comprobamos si las contraseñas coinciden.
    const validPassword = await bcrypt.compare(password, Usuarios.password);

    // Si la contraseña es incorrecta lanzamos un error.
    if (!validPassword) {
      throw generateError("Contraseña incorrecta", 401);
    }

    console.log(Usuarios);

    // Generamos un objeto con la información que queremos añadir al token.
    const payload = {
      id: Usuarios.id,
      rol: Usuarios.rol,
    };

    // Generamos el token.
    const token = jwt.sign(payload, process.env.SECRET, {
      expiresIn: "7d",
    });

    res.send({
      status: "ok",
      data: {
        token,
      },
    });
  } catch (err) {
    next(err);
  }
};

module.exports = loginUsuarios;
