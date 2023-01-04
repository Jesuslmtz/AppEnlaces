const selectAllEnlacesQuery = require("../../bbdd/queries/enlaces/selectAllEnlacesQuery");

const listEnlaces = async (req, res, next) => {
  try {
    // Obtenemos la palabra que queremos filtrar.
    const { keyword } = req.query;

    // Obtenemos los enlaces.
    const enlaces = await selectAllEnlacesQuery(req.user?.id, keyword);

    res.send({
      status: "ok",
      data: {
        enlaces,
      },
    });
  } catch (err) {
    next(err);
  }
};

module.exports = listEnlaces;
