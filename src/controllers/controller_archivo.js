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

archivoCtrl.getArchivo = async (req, res) => {
  const archivos = await ModeloArchivo.find( {_id: req.body.nombre} );
  res.json(archivos);
};

archivoCtrl.getArchivos = async (req, res) => {
  const archivos = await ModeloArchivo.find( {usuarioId: req.params.id} );
  res.json(archivos);
};

archivoCtrl.abrirArchivo = async (req, res) => {

  const keyName = await ModeloArchivo.find( {nombreOriginal: req.body.nombreOriginal, usuarioId: req.params.id} );

  if (keyName.length === 0) { return res.json( {message: 'Archivo no encontrado'} ); }

  const downloadParams = { Key: keyName[0].key, Bucket: bucket };

  const x = s3.getObject(downloadParams).createReadStream();

  x.pipe(res);
};

archivoCtrl.guardarBucket = async (req, res) => {

  const { buffer, originalname, mimetype } = req.file;

  const keyName = `${req.params.id}/${Date.now()}${originalname}`;

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

archivoCtrl.borrarArchivo = async (req, res) => {

  const keyName = `${req.params.id}/${req.body.nombreOriginal}`;

  const params = { Bucket: bucket, Key: keyName };

  s3.deleteObject(params, function(err, data) {
    if (err) { 
      console.log(err)
      res.json({message: 'Ocurrio un error en el programa:'}) 
    }
  });

  await ModeloArchivo.findOneAndDelete( {key: keyName} );

  res.json( {message: 'Archivo eliminado'} )
};


module.exports = archivoCtrl;
