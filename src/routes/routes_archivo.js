const { Router } = require('express');

const router = Router();
const multer  = require('multer');

var storage = multer.memoryStorage(); 
const upload = multer({ storage });

const {
  abrirArchivo, guardarBucket, borrarArchivo, getArchivo, getArchivos,
} = require('../controllers/controller_archivo.js');

router.route('/')
  .get(getArchivo);

router.route('/:id')
  .get(getArchivos);

router.route('/s3/:id')
  .get(abrirArchivo)
  .post(upload.single('file'), guardarBucket)
  .delete(borrarArchivo);

module.exports = router;
