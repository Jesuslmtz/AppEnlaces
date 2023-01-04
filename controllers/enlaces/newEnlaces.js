const insertTweetQuery = require("../../bbdd/queries/enlaces/insertEnlacesQuery");

const { generateError, savePhoto } = require("../../helpers");

const newEnlaces = async (req, res, next) => {
  try {
    const { text } = req.body;

    if (!text) {
      throw generateError("Faltan campos", 400);
    }

    // Variable donde almacenaremos el nombre con el que vamos a guardar
    // la imagen en disco (si es que hay imagen, es opcional).
    let image;

    // Si existe imagen la guardamos en la carpeta de uploads y obtenemos
    // el nombre con el que la hemos guardado. Le pasamos como segundo
    // argumento el valor 1 para indicar que se trata de una imagen de un
    // tweet (no de un avatar).
    if (req.files?.image) {
      image = await savePhoto(req.files.image, 1);
    }

    // Insertamos el tweet en la base de datos. Obtenemos el id del tweet.
    const idEnlaces = await insertEnlacesQuery(req.user.id, text, image);

    res.send({
      status: "ok",
      data: {
        enlaces: {
          id: idEnlaces,
          idAutor: req.user.id,
          URL,
          image,
          createdAt: new Date(),
        },
      },
    });
  } catch (err) {
    next(err);
  }
};

module.exports = newEnlaces;
