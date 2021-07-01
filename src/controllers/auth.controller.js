const { response } = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const models = require('../models');
const { generarJWT } = require('../helpers/jwt');

const signUp = async (req, res = response) => {

    /** para obtener los valores del body */
    const campos = { name, email, password, image_url } = req.body;

    await models.User.findOne({ where: { email: campos.email } }, { attributes: { exclude: ['password'] } }).then( async (result) => {
        /** validar si existe el email para responder mensaje */
        if (result) {
            /** responder el estado y mensaje formato json */
            return res.status(409).json({
                ok: false,
                msg: 'Email duplicado.'
            });
        } else {
            // Encriptar contraseña
            const salt = bcrypt.genSaltSync(10);
            campos.password = bcrypt.hashSync(password, salt);

            
            /** crear usuario junto los campos y resuleve una promesa */
            await models.User.create(campos).then( async (result) => {

                /** Generar El TOKEN JWT */
                const token = await generarJWT( result.id );

                res.status(201).json({
                    ok: true,
                    message: 'usuario registrado exitosamente.',
                    user:  { id: result.id , name: result.name, email: result.email, actualizado: result.updatedAt, creado: result.createdAt} ,
                    token: token
                })
            }).catch(error => {
                res.status(500).json({
                    ok: false,
                    message: 'Problemas con la grabación.',
                    error: error
                })
            })
        }
    })
}

const login = async (req, res = response) => {

    /** para obtener los valores del body */
    const campos = { email, password } = req.body;

    await models.User.findOne({ where: { email: campos.email } }).then(user => {
        if (user == null) {
            res.status(401).json({
                ok: false,
                message: 'Credenciales invalidas'
            })
        } else {
            /** Verificar Contraseña encriptada. */
            bcrypt.compare(password, user.password, async (err, result) => {
                /** valdiar si el password no existe */
                if (!result) {
                    /** responder el estado y mensaje formato json */
                    return res.status(400).json({
                        ok: false,
                        msg: 'Contraseña o email incorrecto.'
                    });
                } else {             
                    /** Generar El TOKEN JWT */
                    const token = await generarJWT( user.id);

                    res.status(200).json({
                        ok: true,
                        message: 'Autentificación exitosa',
                        token: token
                    })
                }
            });
        }
    }).catch(error => {
        res.status(500).json({
            ok: false,
            message: 'Problemas con la grabación.',
            error: error
        })
    })
}

module.exports = {
    signUp: signUp,
    login: login
}