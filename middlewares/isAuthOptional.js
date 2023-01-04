const jwt = require('jsonwebtoken');

const { generateError } = require('../helpers');

const isAuth = async (req, res, next) => {
    try {
        // Obtenemos el token de la cabecera.
        const { authorization } = req.headers;

        // Si hay token lo desencriptamos.
        if (authorization) {
            // Variable que contendrá la información del token una vez deserializado.
            let userInfo;

            try {
                // Intentamos obtener la info del token.
                userInfo = jwt.verify(authorization, process.env.SECRET);
            } catch {
                throw generateError('Token incorrecto', 401);
            }

            // Agregamos una nueva propiedad (inventada por nosotros) en el objeto request.
            req.user = userInfo;
        }

        // Saltamos a la siguiente función controladora.
        next();
    } catch (err) {
        next(err);
    }
};

module.exports = isAuth;
