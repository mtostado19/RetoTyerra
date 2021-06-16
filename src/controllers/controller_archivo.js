const archivoCtrl = {};

const ModeloArchivo = require("../models/model_archivo.js");

const AWS = require('aws-sdk').S3;

const id = process.env.ID_S3;
const secret = process.env.SECRET_S3;

const bucket = process.env.BUCKET_NOMBRE;;

const s3 = new AWS({
    accessKeyId: id,
    secretAccessKey: secret,
});

archivoCtrl.guardarBucket = async (req, res) => {

  let keyName = `${req.params.id}/${req.file.originalname}`

  const params = { Bucket: bucket, Key: keyName, Body: req.file.path };

  s3.upload(params, function(err, data) {
    if (err) {
      res.json({message: 'Ocurrio un error en el programa:'}, err)
    }
  });

  const nuevoArchivo = new ModeloArchivo({
    key: keyName,
    usuarioId: req.params.id,
    type: req.file.mimetype,
  });

  await nuevoArchivo.save();


  res.json({ message: 'Guardado con exito! '});
};


module.exports = archivoCtrl;
