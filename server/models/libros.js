const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');


let Schema = mongoose.Schema;

let librosSchema = new Schema({

    categoria: {
        type: String,
        required: [true, 'La categoria es necesaria']
    },
    imagen: {
        type: String
    },
    nombre: {
        type: String,
        required: [true, 'El nombre es necesario']
    },
    descripcion: {
        type: String,
        required: [true, 'La descripcion es necesaria']
    }
});

librosSchema.plugin(uniqueValidator, {
    message: '{PATH} debe ser unico y diferente'
});

module.exports = mongoose.model('Libros', librosSchema);