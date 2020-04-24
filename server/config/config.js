// PUERTO
process.env.PORT = process.env.PORT || 3000;

// ENTORNO
process.env.NODE_ENV = process.env.NODE_ENV || 'dev';

// FIRMA SECRETA DE JWT
process.env.FIRMA = process.env.FIRMA || 'firma-super-secreta';

// CONEXIÓN A LA BASE DE DATOS
let urlDB;

if (process.env.NODE_ENV === 'dev') {
    urlDB = 'mongodb://localhost:27017/bibloteca';
} else {
    urlDB = 'mongodb+srv://admin:admin123$&@cluster0-o1x3w.mongodb.net/bibloteca?retryWrites=true&w=majority';
}

process.env.URLDB = urlDB;