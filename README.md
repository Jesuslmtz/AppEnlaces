# EXPLICACION PROYECTO

Pequeña API sobre una app que te permite crear enlaces, compartirlos, votarlos como utiles, y borrar o cambiar tu voto.

## PASOS PREVIOS

- Crear una base de datos en una instancia de MySQL en local.

- Guardar un .env.example para marcar los aspectos y datos que debemos definir para el correcto funcionamiento de todos los endpoints, middlewares y controllers.

-Ejecutar "npm run initDB" para crear las tablas necesarias para el correcto funcionamiento de la bbdd.

-Ejecutar las dependencias necesarias para el correcto funcionamiento. En nuestro caso son las siguientes:

```bash
npm i # instala todas las dependencias
```

1.  npm i express . Libreria de node con métodos para crear servidores.
2.  npm i jsonwebtoken . Nos permite generar un token con informacion privada.
3.  npm i dotenv . Nos permite leer el archivo .env
4.  npm i mysql2 . Nos permite crear y gestionar bbdd desde JS.
5.  npm i morgan . Permite mostrar la informacion de las peticiones al servidor en consola.
6.  npm i bcrypt . Permite encriptar y desencriptar contraseñas.
7.  npm i sharp. Para poder procesar imagenes
8.  npm i nodemailer . Para poder gestionar envio de emails personalizados
9.  npm i uuid . Genera codigos aleatorios y unicos. Usado para nombre de ficheros, por ejemplo.
10. npm i eslint . Dependencia DEV
11. npm i nodemon . Usado para reiniciar el servidor despues de cada cambio.
12. npx eslint --init.

### ENTIDADES

-Usuarios:

- id
- email
- rol
- password
- foto
- biografia
- createdAt
- modifiedAt

-Enlaces:

- id
- idAutor
- URL
- titulo
- foto
- descripcion
- fecha

-Votos:

- id
- idAutor
- idEnlaces
- fecha
- valoracion
- unique

#### ENDPOINTS USUARIOS

-POST ["/usuarios"] .Registro de usuario
-POST ["/usuarios/login"]. Login de usuario (Genera un token)
-GET ["/usuarios"]. Devuelve información de un usuario concreto (requiere token de login)
-PUT ["/usuarios"]. Editar el email o avatar (requiere token de la login)

#### ENDPOINTS ENLACES

-POST ["/Enlaces"]. Crear un enlace (requiere token de login)
-GET ["/Enlaces"]. Lista de todos los enlaces
-GET ["/Enlaces/:idEnlaces"]. Información sobre un enlace concreto
-POST ["/Enlaces/:idEnlaces/votos"]. Añade un voto (requiere token de login)
-DELETE ["/Enlaces/:idEnlaces/votos"]. Borra un voto (requiere token de login)
-DELETE ["/Enlaces/:idEnlaces"]. Borra un enlace (requiere token de login).
