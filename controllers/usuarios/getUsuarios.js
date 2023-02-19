const selectUsuariosByIdQuery = require("../../bbdd/queries/usuarios/selectUsuariosByIdQuery");

const getUsuarios = async (req, res, next) => {
  try {
    const user = await selectUsuariosByIdQuery(req.params.id);

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

module.exports = getUsuarios;
