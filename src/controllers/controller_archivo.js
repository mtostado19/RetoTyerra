const archivoCtrl = {};

const AWS = require('aws-sdk').S3;

const id = process.env.ID_S3;
const secret = process.env.SECRET_S3;

const bucket = process.env.BUCKET_NOMBRE;;

const s3 = new AWS({
    accessKeyId: id,
    secretAccessKey: secret,
});

archivoCtrl.guardarBucket = async (req, res) => {

  const params = { Bucket: bucket, Key: `${req.params.id}/${req.file.originalname}`, Body: req.file.path };

  s3.upload(params, function(err, data) {
    if (err) {
      res.json({message: 'Ocurrio un error en el programa:'}, err)
    }
  });

  res.json({ message: 'Guardado con exito! '});
};


module.exports = archivoCtrl;
