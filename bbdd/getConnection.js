const mysql = require("mysql2/promise");

// Obtenemos las variables de entorno mediante destructuring.
const { MYSQL_HOST, MYSQL_USER, MYSQL_PASS, MYSQL_BBDD } = process.env;

// Variable que almacenará un grupo de conexiones.
let pool;

// Función que retorna una conexión libre con la base de datos.
const getConnection = async () => {
  try {
    // Si no hay un grupo de conexiones las creamos.
    if (!pool) {
      pool = mysql.createPool({
        connectionLimit: 10,
        host: MYSQL_HOST,
        user: MYSQL_USER,
        password: MYSQL_PASS,
        database: MYSQL_BBDD,
        timezone: "Z",
      });
    }

    // Retornamos una conexión libre.
    return await pool.getConnection();
    console.log(await pool.getConnection());
  } catch (err) {
    console.error(err);
  }
};

// Exportamos la función anterior.
module.exports = getConnection;
