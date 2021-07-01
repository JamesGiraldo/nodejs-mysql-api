const { Router } = require('express');
const router = Router();
/** metodos importados del controller presente */
const { upload } = require('../controllers/upload.controller');

/** helpers */
const { ubicacion_uploads } = require('../helpers/upload');

/** ruta principal metodo post */
router.post( '/uploads', ubicacion_uploads, upload );

/** exportar el modulo de ruta */
module.exports = router;