const fs = require('fs/promises');
const path = require('path');
const sharp = require('sharp');
const { v4: uuid } = require('uuid');

/**
 * ####################
 * ## Generate Error ##
 * ####################
 */

const generateError = (msg, code) => {
    const err = new Error(msg);
    err.statusCode = code;
    return err;
};

/**
 * ################
 * ## Save Photo ##
 * ################
 */

const savePhoto = async (img, tweetImg = 0) => {
    // Creamos la ruta absoluta al directorio donde vamos a subir las imágenes.
    const uploadsPath = path.join(__dirname, process.env.UPLOADS_DIR);

    try {
        // Intentamos acceder al directorio de subida de archivos mediante el
        // método "access". Este método genera un error si no es posible acceder
        // al directorio o archivo.
        await fs.access(uploadsPath);
    } catch {
        // Si salta un error quiere decir que el directorio no existe así que lo creamos.
        await fs.mkdir(uploadsPath);
    }

    // Convertimos la imagen en un objeto Sharp.
    const sharpImg = sharp(img.data);

    // Si se trata de una imagen de un tweet la redimensionamos a 500px de
    // ancho, de lo contrario (si es un avatar) redimensionamos a 150px.
    if (tweetImg) {
        // Redimensionamos la imagen a 500px de ancho.
        sharpImg.resize(500);
    } else {
        // Redimensionamos la imagen a 150px para evitar que ocupe demasiado
        // dado que se trata de un avatar.
        sharpImg.resize(150);
    }

    // Generamos un nombre único para la imagen.
    const imgName = `${uuid()}.jpg`;

    // Generamos la ruta absoluta de la imagen.
    const imgPath = path.join(uploadsPath, imgName);

    // Guardamos la imagen en el directorio correspondiente.
    await sharpImg.toFile(imgPath);

    // Retornamos el nombre que le hemos dado a la imagen.
    return imgName;
};

/**
 * ##################
 * ## Delete Photo ##
 * ##################
 */

const deletePhoto = async (imgName) => {
    try {
        // Creamos la ruta absoluta al al archivo que queremos eliminar.
        const imgPath = path.join(__dirname, process.env.UPLOADS_DIR, imgName);

        try {
            // Intentamos acceder a la imagen mediante el método "access". Este
            // método genera un error si no es posible acceder al archivo.
            await fs.access(imgPath);
        } catch {
            // Si salta un error quiere decir que el archivo no existe así que
            // finalizamos la función.
            return false;
        }

        // Eliminamos el archivo del disco.
        await fs.unlink(imgPath);

        return true;
    } catch {
        throw generateError('Error al eliminar la imagen del servidor');
    }
};

module.exports = {
    generateError,
    savePhoto,
    deletePhoto,
};