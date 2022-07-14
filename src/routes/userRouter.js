const router = require('express').Router();

const userController = require('../controllers/userController');
const { authenticateJWT, checkIsAdmin } = require('../middlewares/index');

router.get('/', authenticateJWT, checkIsAdmin, userController.getUsers);

router.route('/:id')
  .get([authenticateJWT, checkIsAdmin], userController.getUser)
  .put([authenticateJWT, checkIsAdmin], userController.updateUser)
  .delete([authenticateJWT, checkIsAdmin], userController.deleteUser);

module.exports = router;