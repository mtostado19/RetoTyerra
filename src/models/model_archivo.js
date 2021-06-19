const { Schema, model } = require('mongoose');

const archivoSchema = new Schema({
  usuarioId: {
    type: String,
    required: true,
  },
  key: {
    type: String,
    required: true,
  },
  type: {
    type: String,
    required: true,
  },
  nombreOriginal: {
    type: String,
    required: true,
  },
});

module.exports = model('archivos', archivoSchema);