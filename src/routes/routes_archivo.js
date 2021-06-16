const { Router } = require('express');

const router = Router();

const {
  guardarBucket,
} = require('../controllers/controller_archivo.js');

router.route('/')
  .post(guardarBucket);

module.exports = router;
