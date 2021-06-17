const { Router } = require('express');

const router = Router();
const multer  = require('multer');

const upload = multer({ dest: 'uploads/' });

const {
  abrirArchivo, guardarBucket,
} = require('../controllers/controller_archivo.js');

router.route('/:id')
  .get(abrirArchivo)
  .post(upload.single('file'), guardarBucket);

module.exports = router;
