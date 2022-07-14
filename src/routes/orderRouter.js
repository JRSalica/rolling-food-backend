const router = require('express').Router();

const orderController = require('../controllers/orderController');
const { authenticateJWT, checkIsAdmin } = require('../middlewares/index');

router.get('/', [authenticateJWT, checkIsAdmin], orderController.getOrders);

router.route('/:id')
  .get([authenticateJWT, checkIsAdmin], orderController.getOrder)
  .put([authenticateJWT, checkIsAdmin], orderController.updateOrder)
  .delete([authenticateJWT, checkIsAdmin], orderController.deleteOrder);

  module.exports = router;