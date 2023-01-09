require("dotenv").config();
const express = require("express");
const fileUpload = require("express-fileupload");
const morgan = require("morgan");
const cors = require("cors");

const { PORT, UPLOADS_DIR } = process.env;

// Creamos un servidor express.
const app = express();

// Middleware que permite conectar el backend con el frontend (evita problemas
// con as CORS), ahora poco útil, pero muy útil en el futuro.
app.use(cors());

// Middleware que indica cuál es el directorio de ficheros estáticos.
app.use(express.static(UPLOADS_DIR));

// Middleware que deserializa un body en formato "raw" creando la propiedad
// "body" en el objeto "request".
app.use(express.json());

// Middleware que deserializa un body en formato "form-data" creando la propiedad
// "files" en el objeto "request".
app.use(fileUpload());

// Middleware que nos da información acerca de la petición actual.
app.use(morgan("dev"));

/**
  Controladores intermedios 
 */

const isAuth = require("./middlewares/isAuth");
const isAuthOptional = require("./middlewares/isAuthOptional");
const enlaceExists = require("./middlewares/enlaceExists");

/**
 Controladores usuarios
 */

const {
  newUsuarios,
  loginUsuarios,
  getOwnUsuarios,
  editUsuarios,
} = require("./controllers/usuarios");

// Registrar un nuevo usuario.
app.post("/usuarios", newUsuarios);

// Logear un usuario y retornar un token.
app.post("/usuarios/login", loginUsuarios);

// Obtener información sobre el usuario del token.
app.get("/usuarios", isAuth, getOwnUsuarios);

// Editar la información de email y foto.
app.put("/usuarios", isAuth, editUsuarios);

/**
  Controladores enlaces 
 
 */

const {
  newEnlaces,
  listEnlaces,
  getEnlaces,
  newVotos,
  deleteVotos,
  deleteEnlaces,
} = require("./controllers/enlaces");

// Crear un nuevo enlace.
app.post("/Enlaces", isAuth, newEnlaces);

// Listar todos los Enlaces.
app.get("/Enlaces", isAuthOptional, listEnlaces);

// Obtener información de un enlace concreto.
app.get("/Enlaces/:idEnlaces", isAuthOptional, enlaceExists, getEnlaces);

// Crear un nuevo voto sobre un enlace existente.
app.post("/Enlaces/:idEnlaces/votos", isAuth, enlaceExists, newVotos);

// Eliminar un voto existente.
app.delete("/Enlaces/:idEnlaces/votos", isAuth, enlaceExists, deleteVotos);

// Eliminar un enlace.
app.delete("/Enlaces/:idEnlaces", isAuth, enlaceExists, deleteEnlaces);

/**
  Middleware Error / Not found

 */

// Middleware de error.
app.use((err, req, res, next) => {
  // Es recomendable añadir este console.error para poder ver
  // información detallada sobre los errores que vayan ocurriendo.
  console.error(err);

  res.status(err.statusCode || 500).send({
    status: "error",
    message: err.message,
  });
});

// Middleware de ruta no encontrada.
app.use((req, res) => {
  res.status(404).send({
    status: "error",
    message: "No encontrado",
  });
});

// Ponemos el servidor a escuchar peticiones en un puerto dado.
app.listen(PORT, () => {
  console.log(`Server listening at http://localhost:${PORT}`);
});
