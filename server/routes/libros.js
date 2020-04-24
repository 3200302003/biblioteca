const express = require('express');
const app = express();
const _ = require('underscore');
const bcrypt = require('bcrypt');
const Libros = require('../models/libros');
const { verificaToken } = require('../middleware/autenticacion');
app.get('/libros', function(req, res) {
    let desde = req.query.desde || 0;
    let limite = req.query.limite || 0;

    desde = Number(desde);
    limite = Number(limite);

    Libros.find({})
        .skip(desde)
        .limit(limite)
        .exec((err, libros) => {
            if (err) {
                return res.status(400).json({
                    ok: false,
                    mensaje: `Ocurrio un error al momento de consultar ${err}`
                });
            }

            res.json({
                ok: true,
                mensaje: 'Consulta realizada con exito',
                libros
            });
        });

});

app.post('/libros', [verificaToken], function(req, res) {
    let body = req.body;

    let libros = new Libros({
        categoria: body.categoria,
        nombre: body.nombre,
        descripcion: body.descripcion
    });

    libros.save((err, librosDB) => {
        if (err) {
            return res.status(400).json({
                ok: false,
                mensaje: `Ocurrio un error al momento de guardar ${err}`
            });
        }

        res.json({
            ok: true,
            mensaje: 'El libro ha sido insertado con exito',
            libros: librosDB
        });
    });
});

app.put('/libros/:id', [verificaToken], function(req, res) {
    let id = req.params.id;
    let body = _.pick(req.body, ['categoria', 'imagen', 'nombre', 'descripcion']);

    Libros.findByIdAndUpdate(id, body, { new: true, runValidators: true, context: 'query' }, (err, librosDB) => {
        if (err) {
            return res.status(400).json({
                ok: false,
                mensaje: `Ocurrio un error al momento de actualizar ${err}`
            });
        }

        return res.json({
            ok: true,
            mensaje: 'Cambios guardados con exito',
            libros: librosDB
        });
    });

});

app.delete('/libros/:id', [verificaToken], function(req, res) {
    let id = req.params.id;
    Libros.deleteOne({ _id: id }, (err, resp) => {
        if (err) {
            return res.status(400).json({
                ok: false,
                err
            });
        }
        if (resp.deletedCount === 0) {
            return res.status(400).json({
                ok: false,
                err: {
                    id,
                    msg: 'Libro no encontrado'
                }
            });
        }
        return res.status(200).json({
            ok: true,
            resp
        });

    });
});

module.exports = app;