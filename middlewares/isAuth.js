const jwt = require("jsonwebtoken");

const { generateError } = require("../helpers");

const isAuth = async (req, res, next) => {
  try {
    // Obtenemos el token de la cabecera.
    const { authorization } = req.headers;

    // Si no hay token lanzamos un error.
    if (!authorization) {
      throw generateError("Falta la cabecera de autorización", 400);
    }

    // Variable que contendrá la información del token una vez deserializado.
    let userInfo;

    try {
      // Intentamos obtener la info del token.
      userInfo = jwt.verify(authorization, process.env.SECRET);
    } catch {
      throw generateError("Token incorrecto", 401);
    }

    // Agregamos una nueva propiedad en el objeto request.
    req.usuarios = userInfo;

    // Saltamos a la siguiente función controladora.
    next();
  } catch (err) {
    next(err);
  }
};

module.exports = isAuth;
