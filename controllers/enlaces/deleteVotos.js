const deleteVotosQuery = require("../../bbdd/queries/enlaces/deleteVotosQuery");

const deleteVotos = async (req, res, next) => {
  try {
    const { idEnlaces } = req.params;

    // Borramos el Voto.
    await deleteVotosQuery(req.user.id, idEnlaces);

    res.send({
      status: "ok",
      message: "Voto eliminado",
    });
  } catch (err) {
    next(err);
  }
};

module.exports = deleteVotos;
