const { Router } = require('express');
const router = Router();
/** metodos importados del controller presente */
const { index, show, save, update, destroy } = require('../controllers/post.controller');
/** metodo importado del middleware, para validar toke XD */
const { checkAuth } = require('../middleware/check-auth');

/** ruta principal metodo get */
router.get( '/posts', index );

/** ruta principal metodo get */
router.get( '/posts/:id', show );

/** ruta principal metodo post */
router.post( '/posts', checkAuth, save );

/** ruta principal metodo PUT */
router.put( '/posts/:id', checkAuth, update );

/** ruta principal metodo DELETE */
router.delete( '/posts/:id', checkAuth, destroy );

/** exportar el modulo de ruta */
module.exports = router;