const { response } = require('express');
const Validator = require('fastest-validator');
const v = new Validator();
const bcrypt = require('bcryptjs');

const models = require('../models');


const updatePasswrod = async (req, res = response) => {

    /** tomar el id de los parametros  */
    const id = req.params.id;

    /** obtener el valor del body  */
    const cuerpoUpdate = { password, lastPassword } = req.body;

    await models.User.findByPk(id).then(user => {

        /** schea de campos a validar */
        const schema = {
            password: { type: "string", optional: false, max: 150 },
            lastPassword: { type: "string", optional: false, max: 150 }
        }

        /** respuesta de la validación que recibe los campos y las validaciones */
        const validationResponse = v.validate(cuerpoUpdate, schema);

        /** validar si es diferente a true */
        if (validationResponse !== true) {
            return res.status(400).json({
                ok: false,
                message: 'Los campos son requeridos.',
                error: validationResponse
            })
        }

        if (user) {

            /** Verificar Contraseña encriptada. */
            bcrypt.compare(lastPassword, user.password, async (err, result) => {

                /** valdiar si el password no existe */
                if (!result) {
                    /** responder el estado y mensaje formato json */
                    return res.status(400).json({
                        ok: false,
                        msg: 'La contraseña anterior es incorrecta.'
                    });
                } else {
                    // Encriptar contraseña
                    const salt = bcrypt.genSaltSync(10);
                    cuerpoUpdate.password = bcrypt.hashSync(cuerpoUpdate.password, salt);

                    if (password === lastPassword) {
                        res.status(401).json({
                            ok: false,
                            message: 'La contraseña no puede ser igual a la anterior'
                        })
                    } else {
                        /** actualizar el campo del ususario :D  */
                        await models.User.update(cuerpoUpdate, { where: { id: user.id } }).then(result => {

                            if (result) {
                                res.status(201).json({
                                    ok: true,
                                    message: 'Contraseña Actualizada Exitosamente',
                                    result: result
                                });
                            } else {
                                /** Si no recibe la respuesta. */
                                res.status(404).json({
                                    ok: false,
                                    message: 'Usuario no encontrado.',
                                });
                            }

                        }).catch(error => {
                            /** Si lapetición esta mal mostrar el error. */
                            res.status(500).json({
                                ok: false,
                                message: 'Algo salió mal.',
                                error: error
                            });
                        })
                    }
                }

            })
        } else {
            /** Si no recibe la respuesta. */
            res.status(404).json({
                ok: false,
                message: 'User no encontrado.',
            });
        }
    }).catch(error => {
        /** Si lapetición esta mal mostrar el error. */
        res.status(500).json({
            ok: false,
            message: 'Algo salió mal.',
            error: error
        });
    })


}


/** esportar los metodo o modulos del controlador. */
module.exports = {
    updatePasswrod: updatePasswrod
}