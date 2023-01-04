const insertVotosQuery = require("../../bbdd/queries/enlaces/insertVotosQuery");

const newVotos = async (req, res, next) => {
  try {
    const { idEnlaces } = req.params;

    // Insertamos el voto.
    await insertVotosQuery(req.user.id, idEnlaces);

    res.send({
      status: "ok",
      message: "Voto agregado",
    });
  } catch (err) {
    next(err);
  }
};

module.exports = newVotos;
