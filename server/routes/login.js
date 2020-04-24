const express = require('express');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const Usuario = require('../models/usuario');
const app = express();

app.post('/login', (req, res) => {
    let body = req.body;

    Usuario.findOne({ email: body.email }, (err, usrBD) => {
        if (err) {
            return res.status(400).json({
                ok: false,
                mensaje: `La consulta fallo ${err}`
            });
        }

        if (!usrBD) {
            return res.status(400).json({
                ok: false,
                mensaje: `*Usuario y/o contraseña incorrectos`
            });
        }

        if (!bcrypt.compareSync(body.password, usrBD.password)) {
            return res.status(400).json({
                ok: false,
                mensaje: `Usuario y/o *contraseña incorrectos`
            });
        }

        let token = jwt.sign({ usuario: usrBD }, process.env.FIRMA);

        return res.json({
            ok: true,
            mensaje: `Bienvenido ${usrBD.nombre}`,
            usuario: usrBD,
            token
        });
    });
});

module.exports = app;