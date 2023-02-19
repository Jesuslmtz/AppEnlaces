const bcrypt = require("bcrypt");

const selectUsuariosByIdQuery = require("../../bbdd/queries/usuarios/selectUsuariosByIdQuery");
const updateUsuariosQuery = require("../../bbdd/queries/usuarios/updateUsuariosQuery");
const updateUsuarioPasswordQuery = require("../../bbdd/queries/usuarios/updateUsuarioPasswordQuery");

const { savePhoto, deletePhoto, generateError } = require("../../helpers");

const editUsuarios = async (req, res, next) => {
  try {
    // Obtenemos el email.
    let { email, nombreUsuario, password } = req.body;

    // Si faltan los dos campos (email y foto) lanzo un error.
    if (!email) {
      throw generateError("Faltan campos", 400);
    }

    // Obtenemos los datos del usuario.
    const usuario = selectUsuariosByIdQuery(req.usuarios.id);

    // Variable que almacenará el nuevo nombre del foto (si lo hay).
    let foto;

    // Si en "req.files" existe un foto procedemos a almacenarlo en
    // el servidor.
    if (req.files?.foto) {
      // En caso de que el usuario ya tenga un foto lo eliminamos de la carpeta
      // de uploads.
      if (usuario.foto) {
        await deletePhoto(usuario.foto);
      }

      // Guardamos el foto en el disco y obtenemos el nombre con el cuál lo
      // hayamos guardado.
      foto = await savePhoto(req.files.foto);
    }

    // Establecer el valor final para las variables. En caso de que el usuario
    // no envíe el email o el foto nos quedamos con el valor que haya en la
    // base de datos.
    email = email || usuario.email;
    nombreUsuario = nombreUsuario || usuario.nombreUsuario;
    foto = foto || usuario.foto;

    if (password) {
      // Encriptamos la contraseña.
      password = await bcrypt.hash(password, 10);
      await updateUsuarioPasswordQuery(password, req.usuarios.id);
    }

    // Actualizamos el usuario.
    await updateUsuariosQuery(email, nombreUsuario, foto, req.usuarios.id);

    res.send({
      status: "ok",
      message: "Usuario actualizado",
    });
  } catch (err) {
    next(err);
  }
};

module.exports = editUsuarios;
