const jwt = require('jsonwebtoken');
const { response } = require('express');

const checkAuth = async (req, res = response, next) => {
    try {

        /**  Leer el Token */
        const token = req.header('x-token');

        /**  validar si el token no es enviado en la petición o sea si no existe. */
        if ( !token ) {
            /** enviar mensaje de estado */
            return res.status(401).json({
                ok: false,
                msg: 'No hay token en la petición.'
            });
        }
        /**  verificar el token generado */
        const { id } = jwt.verify(token, process.env.JWT_SECRET);

        /**  mandar al req el id del token verificado */
        req.id = id;

        /**  si todo sale correctamente. */
        next();        
    } catch (error) {
        return res.status(401).json({
            ok: false,
            message: 'Token no válido o caducado proporcionado',
            error: error
        })
    }
}

module.exports = {
    checkAuth: checkAuth
}