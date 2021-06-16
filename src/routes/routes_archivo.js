const { Router } = require('express');

const router = Router();
var multer  = require('multer');
var upload = multer({ dest: 'uploads/' });

const {
  guardarBucket,
} = require('../controllers/controller_archivo.js');

router.route('/:id')
  .post(upload.single('file'), guardarBucket);

module.exports = router;
