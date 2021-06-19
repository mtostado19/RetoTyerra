const { Router } = require('express');

const bcrypt = require('bcrypt');

const router = Router();

const jwt = require('jsonwebtoken');

const ModeloUsuario = require('../models/model_usuario');

async function authenticateToken(req, res, next) {
  const token = req.headers['jwt'];
  if (!token) return res.json('No hay token');

  jwt.verify(token, process.env.SECRET, (err, user) => {
    if (err) return res.json('Token Erroneo');
    req.usuarioId = user.id;
    return next();
  });
  return 0;
}

router.post('/', async (req, res) => {
  const user = await ModeloUsuario.findOne({ usuario: new RegExp(`^${req.body.usuario}$`, 'i') });
  if (!user) {
    return res.json({ auth: false, status: 'Usuario no existe' });
  }
  const validPassword = await bcrypt.compare(req.body.contraseña, user.contraseña);;
  if (!validPassword) {
    return res.json({ auth: false, status: 'Contraseña incorrecta' });
  }
  const token = jwt.sign({ id: user.id }, process.env.SECRET, { expiresIn: '24h' });
  return res.json({ auth: true, token });
});

router.get('/VerificarToken', authenticateToken, async (req, res) => {
  const user = await ModeloUsuario.findOne({ _id: req.usuarioId });
  if (!user) {
    return res.json({ status: 'Usuario no existe' });
  }
  return res.json(user);
});

module.exports = router;
