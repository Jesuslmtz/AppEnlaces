const selectUsuariosByIdQuery = require("../../bbdd/queries/usuarios/selectUsuariosByIdQuery");
const updateUsuariosQuery = require("../../bbdd/queries/usuarios/updateUsuariosQuery");

const { savePhoto, deletePhoto, generateError } = require("../../helpers");

const editUsuarios = async (req, res, next) => {
  try {
    // Obtenemos el email.
    let { email } = req.body;

    // Si faltan los dos campos (email y foto) lanzo un error.
    if (!email && !req.files?.foto) {
      throw generateError("Faltan campos", 400);
    }

    // Obtenemos los datos del usuario.
    const usuarios = selectUsuariosByIdQuery(req.usuarios.id);

    // Variable que almacenará el nuevo nombre del foto (si lo hay).
    let foto;

    // Si en "req.files" existe un foto procedemos a almacenarlo en
    // el servidor.
    if (req.files?.foto) {
      // En caso de que el usuario ya tenga un foto lo eliminamos de la carpeta
      // de uploads.
      if (usuarios.foto) {
        await deletePhoto(usuarios.foto);
      }

      // Guardamos el foto en el disco y obtenemos el nombre con el cuál lo
      // hayamos guardado.
      foto = await savePhoto(req.files.foto);
    }

    // Establecer el valor final para las variables. En caso de que el usuario
    // no envíe el email o el foto nos quedamos con el valor que haya en la
    // base de datos.
    email = email || usuarios.email;
    foto = foto || usuarios.foto;

    // Actualizamos el usuario.
    await updateUsuariosQuery(email, foto, req.usuarios.id);

    res.send({
      status: "ok",
      message: "Usuario actualizado",
    });
  } catch (err) {
    next(err);
  }
};

module.exports = editUsuarios;
