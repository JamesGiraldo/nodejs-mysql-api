const { Router } = require('express');
const router = Router();
/** metodos importados del controller presente */
const { index, show, update, destroy } = require('../controllers/user.controller');
/** metodo importado del middleware, para validar toke XD */
const { checkAuth } = require('../middleware/check-auth');

/** ruta principal metodo get */
router.get( '/users', index );

/** ruta principal metodo get */
router.get( '/users/:id', show );

/** ruta principal metodo PUT */
router.put( '/users/:id', checkAuth, update );

/** ruta principal metodo DELETE */
router.delete( '/users/:id', checkAuth, destroy );

/** exportar el modulo de ruta */
module.exports = router;