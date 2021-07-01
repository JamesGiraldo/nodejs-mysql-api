const { response } = require('express');
const Validator = require('fastest-validator');
const v = new Validator();
const bcrypt = require('bcryptjs');

const models = require('../models');

/** GET */
const index = async (req, res = response) => {

    await models.User.findAll({ attributes: { exclude: ['password'] } }).then(result => {        
        res.status(200).json({
            ok: true,
            message: 'Users encontrados',
            users: result
        });
    }).catch(error => {
        /** Si lapetición esta mal mostrar el error. */
        res.status(500).json({
            ok: false,
            message: 'Algo salió mal.',
            error: error
        });
    })
}

/** SHOW */
const show = async (req, res = response) => {

    /** tomar el id de los parametros  */
    const id = req.params.id;

    await models.User.findByPk(id, { attributes: { exclude: ['password'] } }).then(result => {
        if (result) {
            res.status(200).json({
                ok: true,
                message: 'User encontrado',
                user: result
            });
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

/** PUT TODO */
const update = async (req, res = response) => {

    /** tomar el id de los parametros  */
    const id = req.params.id;

    /** obtener el valor del body  */
    const cuerpoUpdate = { name, email, password } = req.body;

    /** schea de campos a validar */
    const schema = {
        name: { type: "string", optional: false, max: 100 },
        email: { type: "string", optional: false, max: 100 }
    }

    /** respuesta de la validación que recibe los campos y las validaciones */
    const validationResponse = v.validate(cuerpoUpdate, schema);

    /** validar si es diferente a true */
    if (validationResponse !== true) {
        return res.status(400).json({
            ok: false,
            message: 'Validación fallida.',
            error: validationResponse
        })
    }

    await models.User.update(cuerpoUpdate, { where: { id: id } }).then(result => {
        if (result) {
            res.status(201).json({
                ok: true,
                message: 'User actualizado exitosamente',
                user: cuerpoUpdate
            });
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

/** DELETE */
const destroy = async (req, res = response) => {

    /** tomar el id de los parametros  */
    const id = req.params.id;

    await models.User.destroy({ where: { id: id } }).then(result => {
        if (result) {
            res.status(200).json({
                ok: true,
                message: 'User eliminado',
            });
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
    index: index,
    show: show,
    update: update, 
    destroy: destroy
}