const { response } = require('express');
const Validator = require('fastest-validator');
const v = new Validator();

const models = require('../models');

/** GET */
const index = async( req, res = response) => {

    await models.Category.findAll().then( result => {
        res.status(200).json({
            ok: true,
            message: 'Categorias encontradas',
            category: result
        });
    }).catch( error => {
        /** Si lapetición esta mal mostrar el error. */
        res.status(500).json({
            ok: false,
            message: 'Something went wrong.',
            error: error
        });        
    })      
}

/** SHOW */
const show = async( req, res = response) => {

    /** tomar el id de los parametros  */
    const id = req.params.id;

    await models.Category.findByPk( id ).then( result => {
        if ( result ) {
            res.status(200).json({
                ok: true,
                message: 'Categoria encontrada.',
                category: result
            });
        }else{
            /** Si no recibe la respuesta. */
            res.status(404).json({
                ok: false,
                message: 'Categoria no encontrada.'
            });            
        }
    }).catch( error => {
        /** Si lapetición esta mal mostrar el error. */
        res.status(500).json({
            ok: false,
            message: 'Something went wrong.',
            error: error
        });        
    })      
}

/** POST TODO */
const save = async(req, res = response) => {
    /** obtener el valor del body  */        
    const cuerpo = { name: req.body.name };    

    /** schea de campos a validar */
    const schema = { name: { type: "string", optional: false, max: 100 } }

    /** respuesta de la validación que recibe los campos y las validaciones */
    const validationResponse = v.validate( cuerpo , schema );

    /** validar si es diferente a true */
    if ( validationResponse !== true ) {
        return res.status(400).json({
            ok: false,
            message: 'Validación fallida.',
            error: validationResponse
        })
    }

    await models.Category.create( cuerpo ).then( result =>  {
        res.status(201).json({
            ok: true,
            message: 'Categoria creada exitosamente.',
            category: result
        });
    }).catch( error => {
        /** Si lapetición esta mal mostrar el error. */
        res.status(500).json({
            ok: false,
            message: 'Something went wrong.',
            error: error
        });        
    })      
}

/** PUT TODO */
const update = async(req, res = response) => {
    
    /** tomar el id de los parametros  */
    const id = req.params.id;
    
    /** obtener el valor del body  */        
    const cuerpoUpdate = { name: req.body.name };        

    /** schea de campos a validar */
    const schema = { name: { type: "string", optional: false, max: 100 } }

    /** respuesta de la validación que recibe los campos y las validaciones */
    const validationResponse = v.validate( cuerpoUpdate , schema );

    /** validar si es diferente a true */
    if ( validationResponse !== true ) {
        return res.status(400).json({
            ok: false,
            message: 'Validación fallida.',
            error: validationResponse
        })
    }

    await models.Category.update( cuerpoUpdate, { where: { id: id } } ).then( result =>  {
        if ( result ) {            
            res.status(201).json({
                ok: true,
                message: 'Categoria actualizada exitosamente.',
                category: cuerpoUpdate
            });
        }else{
            /** Si no recibe la respuesta. */
            res.status(404).json({
                ok: false,
                message: 'Categoria no encontrada.' 
            });            
        }
    }).catch( error => {
        /** Si lapetición esta mal mostrar el error. */
        res.status(500).json({
            ok: false,
            message: 'Something went wrong.',
            error: error
        });        
    })      
}

/** DELETE */
const destroy = async( req, res = response) => {

    /** tomar el id de los parametros  */
    const id = req.params.id;    

    await models.Category.destroy( {where: {id: id } } ).then( result => {    
        if ( result ) {
            res.status(200).json({
                ok: true,
                message: 'Category eliminado',                
            });
        }else{
            /** Si no recibe la respuesta. */
            res.status(404).json({
                ok: false,
                message: 'Category no encontrado.',                
            });            
        }
    }).catch( error => {
        /** Si lapetición esta mal mostrar el error. */
        res.status(500).json({
            ok: false,
            message: 'Something went wrong.',
            error: error
        });        
    })      
}

/** esportar los metodo o modulos del controlador. */
module.exports = {
    save: save,
    show: show,
    index: index,
    update: update,
    destroy: destroy
}