const { Schema, model } = require('mongoose');

const usuarioSchema = new Schema({
  nombre: {
    type: String,
    required: true,
  },
  apellidoPat: {
    type: String,
    required: true,
  },
  apellidoMat: {
    type: String,
    required: true,
  },
  correo: {
    type: String,
    required: true,
  },
  usuario: {
    type: String,
    required: true,
  },
  contraseña: {
    type: String,
    required: true,
  },
});

module.exports = model('usuarios', usuarioSchema);
