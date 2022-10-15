const router = require('express').Router();

const productController = require('../controllers/productController');
const { authenticateJWT, checkIsAdmin } = require('../middlewares/index');

router.get('/', productController.getProducts);
router.post('/', [authenticateJWT, checkIsAdmin], productController.createProduct);

router.route('/:id')
  .get([authenticateJWT, checkIsAdmin], productController.getProduct)
  .put([authenticateJWT, checkIsAdmin], productController.updateProduct)
  .delete([authenticateJWT, checkIsAdmin], productController.deleteProduct);

module.exports = router;
