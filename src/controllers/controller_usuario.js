const usuarioCtrl = {};

const bcrypt = require('bcrypt');

const ModeloUsuario = require('../models/model_usuario.js');

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
  await ModeloUsuario.findOneAndRemove( { _id: req.params.id } );
  res.json({ message: 'Usuario Eliminado' })
}

module.exports = usuarioCtrl;
