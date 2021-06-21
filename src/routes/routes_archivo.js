const { Router } = require('express');

const router = Router();
const multer  = require('multer');

const storage = multer.memoryStorage();
const upload = multer({ storage });

const {
  abrirArchivo, guardarBucket, borrarArchivo, getArchivo, getArchivos, patchArchivos
} = require('../controllers/controller_archivo.js');

router.route('/')
  .get(getArchivo)
  .delete(borrarArchivo);

router.route('/:id')
  .get(getArchivos)
  .patch(patchArchivos);

router.route('/s3/:id')
  .get(abrirArchivo)
  .post(upload.single('file'), guardarBucket);

module.exports = router;
