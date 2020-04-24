const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');
const Usuario = require('./usuario');
const Libros = require('./libros');

let Schema = mongoose.Schema;

let prestamoSchema = new Schema({
    usuario: {
        type: Schema.Types.ObjectId,
        ref: 'Usuario',
        required: true
    },
    libro: {
        type: Schema.Types.ObjectId,
        ref: 'libros',
        required: true,
    },
    fecha_prestamo: {
        type: String,
        require: [true, 'La fecha de prestamo es necesaria']
    },
    fecha_entrega: {
        type: String,
        require: [true, 'La fecha de entrega es necesaria']
    }
});

prestamoSchema.plugin(uniqueValidator, {
    message: '{PATH} debe ser unico y diferente'
});

module.exports = mongoose.model('Prestamo', prestamoSchema);