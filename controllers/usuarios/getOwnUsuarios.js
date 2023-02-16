const selectUsuariosByIdQuery = require("../../bbdd/queries/usuarios/selectUsuariosByIdQuery");

const getOwnUsuarios = async (req, res, next) => {
  try {
    const user = await selectUsuariosByIdQuery(req.usuarios.id);

    res.send({
      status: "ok",
      data: {
        user,
      },
    });
  } catch (err) {
    next(err);
  }
};

module.exports = getOwnUsuarios;
