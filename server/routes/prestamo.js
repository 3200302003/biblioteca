const express = require('express');
const app = express();
const _ = require('underscore');
const bcrypt = require('bcrypt');
const Prestamo = require('../models/prestamo');
const { verificaToken } = require('../middleware/autenticacion');

app.get('/prestamo', [verificaToken], function(req, res) {
    let desde = req.query.desde || 0;
    let limite = req.query.limite || 0;

    desde = Number(desde);
    limite = Number(limite);

    Prestamo.find({})
        .skip(desde)
        .limit(limite)
        .exec((err, prestamo) => {
            if (err) {
                return res.status(400).json({
                    ok: false,
                    mensaje: `Ocurrio un error al momento de consultar ${err}`
                });
            }

            res.json({
                ok: true,
                mensaje: 'Consulta realizada con exito',
                prestamo
            });
        });

});

app.post('/prestamo', [verificaToken], function(req, res) {
    let body = req.body;

    let prestamo = new Prestamo({
        usuario: body.usuario,
        libro: body.libro,
        fecha_prestamo: body.fecha_prestamo,
        fecha_entrega: body.fecha_entrega

    });

    prestamo.save((err, prestamoDB) => {
        if (err) {
            return res.status(400).json({
                ok: false,
                mensaje: `Ocurrio un error al momento de guardar ${err}`
            });
        }

        res.json({
            ok: true,
            mensaje: 'El prestamo ha sido insertado con exito',
            prestamo: prestamoDB
        });
    });
});

app.put('/prestamo/:id', [verificaToken], function(req, res) {
    let id = req.params.id;
    let body = _.pick(req.body, ['Usuario', 'libro', 'fecha_prestamo', 'fecha_entrega']);

    Prestamo.findByIdAndUpdate(id, body, { new: true, runValidators: true, context: 'query' }, (err, prestamoDB) => {
        if (err) {
            return res.status(400).json({
                ok: false,
                mensaje: `Ocurrio un error al momento de actualizar ${err}`
            });
        }

        return res.json({
            ok: true,
            mensaje: 'Cambios guardados con exito',
            prestamo: prestamoDB
        });
    });

});

app.delete('/prestamo/:id', [verificaToken], function(req, res) {
    let id = req.params.id;
    Prestamo.deleteOne({ _id: id }, (err, resp) => {
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