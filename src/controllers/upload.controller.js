const { response } = require('express');

const upload = async (req, res = response) => {

    try {
        console.log(req.file)
        /** validando que exista un archivo */
        if (!req.file || Object.keys(req.file).length === 0 || req.file === undefined) {
            return res.status(400).json({
                ok: false,
                msg: 'No hay ningun Archivo.'
            });
        }        
    
        res.status(201).json({
            ok: true,
            message: 'Archivo subido correctamente'
        })
    } catch (error) {
        return res.status(400).json({
            ok: false,
            msg: 'Problemas con la subida del archivo.',
            error: error
        });
    }
}

module.exports = {
    upload: upload
}