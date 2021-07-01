const { Router } = require('express');
const router = Router();
/** metodos importados del controller presente */
const { updatePasswrod } = require('../controllers/password.controller');
/** metodo importado del middleware, para validar toke XD */
const { checkAuth } = require('../middleware/check-auth');

/** ruta principal metodo PUT */
router.put( '/change-password/:id', checkAuth, updatePasswrod );

/** exportar el modulo de ruta */
module.exports = router;