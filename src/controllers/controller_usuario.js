const usuarioCtrl = {};

const bcrypt = require('bcrypt');

const AWS = require('aws-sdk').S3;

const id = process.env.ID_S3;
const secret = process.env.SECRET_S3;

const bucket = process.env.BUCKET_NOMBRE;

const s3 = new AWS({
    accessKeyId: id,
    secretAccessKey: secret,
});

const ModeloUsuario = require('../models/model_usuario.js');
const ModeloArchivo = require('../models/model_archivo.js');

usuarioCtrl.getUsers = async (req, res) => {
  const usuario = await ModeloUsuario.find();
  res.json(usuario);
};

usuarioCtrl.getUser = async (req, res) => {
  const usuario = await ModeloUsuario.findOne( {_id: req.params.id} );
  res.json(usuario);
};

usuarioCtrl.createUser = async (req, res) => {
  const { nombre, apellidoPat, apellidoMat, correo, usuario, contraseña } =
    req.body;

  if (await ModeloUsuario.exists( { usuario } )) { return res.json({ message: 'El usuario ya existe'}) };
  if (await ModeloUsuario.exists( { correo } )) { return res.json({ message: 'El correo ya existe'}) };
  
  const nuevoUsuario = new ModeloUsuario({
    nombre,
    apellidoPat,
    apellidoMat,
    correo,
    usuario,
    contraseña,
  });

  const salt = await bcrypt.genSalt(10);
  nuevoUsuario.contraseña = await bcrypt.hash(contraseña, salt);

  await nuevoUsuario.save();

  res.json({ message: 'Usuario creado' });
};

usuarioCtrl.updateUser = async (req, res) => {
  const { nombre, apellidoPat, apellidoMat, correo, usuario, contraseña } =
    req.body;

  const usuarioAntiguo = await ModeloUsuario.find( {_id: req.params.id} );

  if (await ModeloUsuario.exists( { usuario } ) && usuarioAntiguo[0].usuario !== usuario) { 
    return res.json({ message: 'El usuario esta ocupado'}) 
  };
  if (await ModeloUsuario.exists( { correo } ) && usuarioAntiguo[0].correo !== correo) {
    return res.json({ message: 'El correo esta ocupado'})
  };
  
  const salt = await bcrypt.genSalt(10);
  req.body.contraseña = await bcrypt.hash(contraseña, salt);

  await ModeloUsuario.findOneAndUpdate({ _id: req.params.id }, req.body)
  res.json( {message: 'El usuario fue actualizado correctamente'} );
};

usuarioCtrl.deleteUser = async (req, res) => {
  if (await ModeloArchivo.exists( {usuarioId: req.params.id} )) {
    console.log('El usuario tenia archivos guardados');
    const data = await ModeloArchivo.find( {usuarioId: req.params.id } )

    let objects = [];

    for(var e in data) {
      objects.push({Key: data[e].key});
    }

    const options = {
      Bucket: bucket,
      Delete: {
        Objects: objects
      }
    }

    s3.deleteObjects(options, function(err, data) {
      if (err) { 
        console.log(err)
        res.json({message: 'Ocurrio un error en el programa:'}) 
      }
    });
    await ModeloArchivo.deleteMany( {usuarioId: req.params.id} );
  }
  await ModeloUsuario.findOneAndRemove( { _id: req.params.id } );
  
  res.json({ message: 'Usuario Eliminado' })
}

module.exports = usuarioCtrl;
