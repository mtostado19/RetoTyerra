const usuarioCtrl = {};

const ModeloUsuario = require("../models/model_usuario.js");

usuarioCtrl.getUsers = async (req, res) => {
  const usuario = await ModeloUsuario.find();
  res.json(usuario);
};

usuarioCtrl.createUser = async (req, res) => {
  let { nombre, apellidoPat, apellidoMat, correo, usuario, contraseña } =
    req.body;
  const nuevoUsuario = new ModeloUsuario({
    nombre,
    apellidoPat,
    apellidoMat,
    correo,
    usuario,
    contraseña,
  });

  await nuevoUsuario.save();

  res.json({ message: "Usuario creado" });
};

usuarioCtrl.updateUser = async (req, res) => {
  await ModeloUsuario.findOneAndUpdate({ _id: req.params.id }, req.body, {
    new: true,
  })
    .then((user) => {
      if (!user) {
        return res.json({ message: "No hay usuario" });
      }
      return res.json(user);
    })
    .catch((err) => {
      res.status(500).send(err);
    });
};

usuarioCtrl.deleteUser = async (req, res) => {
  await ModeloUsuario.findOneAndRemove( { _id: req.params.id } );
  res.json({ message: 'Usuario Eliminado' })
}

module.exports = usuarioCtrl;
