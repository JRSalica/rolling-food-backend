const router = require('express').Router();

const categoryController = require('../controllers/categoryController');
const { authenticateJWT, checkIsAdmin } = require('../middlewares/index');

router.get('/', [authenticateJWT, checkIsAdmin], categoryController.getCategories);
router.post('/', [authenticateJWT, checkIsAdmin], categoryController.createCategory);

router.route('/:id')
  .get([authenticateJWT, checkIsAdmin], categoryController.getCategory)
  .put([authenticateJWT, checkIsAdmin], categoryController.updateCategory)
  .delete([authenticateJWT, checkIsAdmin], categoryController.deleteCategory);

  module.exports = router;
