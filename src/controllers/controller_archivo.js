const archivoCtrl = {};

const ModeloArchivo = require("../models/model_archivo.js");

const AWS = require('aws-sdk').S3;
const fs = require('fs')

const id = process.env.ID_S3;
const secret = process.env.SECRET_S3;

const bucket = process.env.BUCKET_NOMBRE;;

const s3 = new AWS({
    accessKeyId: id,
    secretAccessKey: secret,
});


archivoCtrl.abrirArchivo = async (req, res) => {
  const keyName = `${req.params.id}/${req.body.keyName}`;

  const downloadParams = { Key: keyName, Bucket: bucket };

  const x = s3.getObject(downloadParams).createReadStream()

  x.pipe(res);
};

archivoCtrl.guardarBucket = async (req, res) => {

  const keyName = `${req.params.id}/${req.file.originalname}`

  const fileStream = fs.createReadStream(req.file.path)

  const params = { Bucket: bucket, Key: keyName, Body: fileStream };

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
