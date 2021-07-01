const { Router } = require('express');
const router = Router();
/** metodos importados del controller presente */
const { index, show, save, update, destroy } = require('../controllers/commet.controller');
/** metodo importado del middleware, para validar toke XD */
const { checkAuth } = require('../middleware/check-auth');

/** ruta principal metodo get */
router.get( '/commets', index );

/** ruta principal metodo get */
router.get( '/commets/:id', show );

/** ruta principal metodo post */
router.post( '/commets', checkAuth, save );

/** ruta principal metodo PUT */
router.put( '/commets/:id', checkAuth, update );

/** ruta principal metodo DELETE */
router.delete( '/commets/:id', checkAuth, destroy );

/** exportar el modulo de ruta */
module.exports = router;