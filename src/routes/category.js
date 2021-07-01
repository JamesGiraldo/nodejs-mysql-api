const { Router } = require('express');
const router = Router();
/** metodos importados del controller presente */
const { index, show, update, destroy, save } = require('../controllers/category.controller');
/** metodo importado del middleware, para validar toke XD */
const { checkAuth } = require('../middleware/check-auth');

/** ruta principal metodo get */
router.get( '/categories', index );

/** ruta principal metodo get */
router.get( '/categories/:id', show );

/** ruta principal metodo get */
router.post( '/categories', checkAuth, save );

/** ruta principal metodo PUT */
router.put( '/categories/:id', checkAuth, update );

/** ruta principal metodo DELETE */
router.delete( '/categories/:id', checkAuth, destroy );

/** exportar el modulo de ruta */
module.exports = router;