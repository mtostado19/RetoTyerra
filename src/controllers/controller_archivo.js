const archivoCtrl = {};

const ModeloArchivo = require("../models/model_archivo.js");

const AWS = require('aws-sdk').S3;
const fs = require('fs')

const id = process.env.ID_S3;
const secret = process.env.SECRET_S3;

const bucket = process.env.BUCKET_NOMBRE;

const s3 = new AWS({
    accessKeyId: id,
    secretAccessKey: secret,
});


archivoCtrl.abrirArchivo = async (req, res) => {

  const keyName = await ModeloArchivo.find( {nombreOriginal: req.body.nombreOriginal, usuarioId: req.params.id} );

  if (keyName.length === 0) { return res.json( {message: 'Archivo no encontrado'} ); }

  const downloadParams = { Key: keyName[0].key, Bucket: bucket };

  const x = s3.getObject(downloadParams).createReadStream();

  x.pipe(res);
};

archivoCtrl.guardarBucket = async (req, res) => {

  const { buffer, originalname, mimetype } = req.file;

  const keyName = `${req.params.id}/${originalname}`;

  const params = { Bucket: bucket, Key: keyName, Body: buffer };

  s3.upload(params, function(err, data) {
    if (err) { res.json({message: 'Ocurrio un error en el programa:'}, err) }
  });

  const nuevoArchivo = new ModeloArchivo({
    key: keyName,
    usuarioId: req.params.id,
    type: mimetype,
    nombreOriginal: originalname,
  });

  await nuevoArchivo.save();

  res.json({ message: 'Guardado con exito! '});
};


module.exports = archivoCtrl;
