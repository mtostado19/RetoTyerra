const { Router } = require('express');

const router = Router();

const {
  getUsers, createUser, updateUser, deleteUser,
} = require('../controllers/controller_usuario');

router.route('/')
  .get(getUsers)
  .post(createUser);

router.route('/:id')
  .patch(updateUser)
  .delete(deleteUser);

module.exports = router;
