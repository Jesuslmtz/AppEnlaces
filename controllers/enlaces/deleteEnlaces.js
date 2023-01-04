const deleteEnlacesQuery = require("../../bbdd/queries/enlaces/deleteEnlacesQuery");

const deleteEnlaces = async (req, res, next) => {
  try {
    const { idEnlaces } = req.params;

    // Eliminamos el enlace.
    await deleteEnlacesQuery(req.user.id, idEnlaces);

    res.send({
      status: "ok",
      message: "Enlace eliminado",
    });
  } catch (err) {
    next(err);
  }
};

module.exports = deleteEnlaces;
