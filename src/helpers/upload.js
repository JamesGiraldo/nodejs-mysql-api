const multer = require('multer');
const path = require('path');
const uuid = require('uuid/v4');

// como almacenar el archivo
const storage = multer.diskStorage({
    /** direccion de donde guardar */
    destination: 'src/public/uploads',
    /** como guardarlo  */
    filename: (req, file, cb) => {
        /** sin errores y colocar un id unico gracias a uuid y convertilo en minizcula por si las moscas */
        cb(null, uuid() + path.extname(file.originalname).toLocaleLowerCase());
    }
})

// guardar el archivo 
const ubicacion_uploads = multer({
    /** variable y su metodo Multer */
    storage,
    // destino de guardar
    dest: 'src/public/uploads',
    // limite de archivo 2MG
    limits: { fileSize: 2000000 },
    fileFilter: (req, file, cb) => {
        /**extensiones en una expresion regular */
        const tipoExtensiones = /jpeg|jpg|png|git/;
        /** tipo que se recibe */
        const minimoTipe = tipoExtensiones.test(file.mimetype);
        /** nombre de la extensión */
        const extname = tipoExtensiones.test(path.extname(file.originalname));

        /** validar el tipo que viene y el nombre de la extensión */
        if (minimoTipe && extname) {
            return cb(null, true);
        } else {
            cb("Error: extensión de archivo no valido")
        }
    }
}).single('image');

/** exportar modulos :D  */
module.exports = {
    ubicacion_uploads: ubicacion_uploads
}