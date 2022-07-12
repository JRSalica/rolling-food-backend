const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');
const authenticateJWT = require('../middlewares/authenticateJWT');
const checkIsAdmin = require('../middlewares/checkIsAdmin');

router.get('/', authenticateJWT, checkIsAdmin, userController.getUsers);

// router.param('id', (req, res, next, id) => {

//   next();
// });

// router.route('/:id')
//   .get(userController.getUser)
//   .put(userController.updateUser)
//   .delete(userController.deleteUser);

module.exports = router;