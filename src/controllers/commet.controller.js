const { response } = require('express');
const Validator = require('fastest-validator');
const v = new Validator();

const models = require('../models');

/** GET */
const index = async( req, res = response) => {

    await models.Commet.findAll().then( result => {
        res.status(200).json({
            ok: true,
            message: 'Commets encontrados',
            commets: result
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

    await models.Commet.findByPk( id ).then( result => {
        if ( result ) {
            res.status(200).json({
                ok: true,
                message: 'Commet encontrado',
                commet: result
            });
        }else{
            /** Si no recibe la respuesta. */
            res.status(404).json({
                ok: false,
                message: 'Post no encontrado.',                
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
    const cuerpo = {        
        content: req.body.content,
        postId: 1,    
        userId: 1
    };    

    /** schea de campos a validar */
    const schema = {        
        content: { type: "string", optional: false, max: 500 },        
        postId: { type: "number", optional: false }        
    }
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

    await models.Commet.create( cuerpo ).then( result =>  {
        res.status(201).json({
            ok: true,
            message: 'Commet creado exitosamente',
            post: result
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
    const cuerpoUpdate = { 
        content: req.body.content,        
        postId: req.body.post_id        
    };    
    const userId = 1;

    /** schea de campos a validar */
    const schema = {        
        content: { type: "string", optional: false, max: 500 },
        postId: { type: "number", optional: false }
    }
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

    await models.Commet.update( cuerpoUpdate, { where: { id: id, userId: userId } } ).then( result =>  {
        if ( result ) {            
            res.status(201).json({
                ok: true,
                message: 'Commet actualizado exitosamente',
                post: cuerpoUpdate
            });
        }else{
            /** Si no recibe la respuesta. */
            res.status(404).json({
                ok: false,
                message: 'Commet no encontrado.',                
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
    const userId = 1;

    await models.Commet.destroy( {where: {id: id, userId: userId } } ).then( result => {    
        if ( result ) {
            res.status(200).json({
                ok: true,
                message: 'Commet eliminado',                
            });
        }else{
            /** Si no recibe la respuesta. */
            res.status(404).json({
                ok: false,
                message: 'Commet no encontrado.',                
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