const selectEnlacesByIdQuery = require("../../bbdd/queries/enlaces/selectEnlacesByIdQuery");

const getEnlaces = async (req, res, next) => {
  try {
    const { idEnlaces } = req.params;

    const Enlaces = await selectEnlacesByIdQuery(req.user?.id, idEnlaces);

    res.send({
      status: "ok",
      data: {
        Enlaces,
      },
    });
  } catch (err) {
    next(err);
  }
};

module.exports = getEnlaces;
