require('./config/config');
const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

//Habilitacion de CORS
app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader(
        'Access-Control-Allow-Headers',
        'Origin, X-Requested-With, Content-Type, Accept, Authorization, token'
    );
    res.setHeader(
        'Acces-Control-Allow-Methods',
        'GET, POST, PUT, DELETE, OPTIONS'
    );
    next();
});

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use(require('./routes/index'));

mongoose.connect('mongodb+srv://admin:admin123$&@cluster0-o1x3w.mongodb.net/biblioteca?retryWrites=true&w=majority', {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useCreateIndex: true
    },
    (err, res) => {
        if (err) throw err;
        console.log('Base de datos ONLINE');
    });

app.listen(process.env.PORT, () => {
    console.log('Escuchando por el puerto: 3000');
});