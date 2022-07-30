const Category = require('../models/Category');

async function getCategories(req, res){
  try {
    categories = await Category.find({ });

    if(categories.length === 0){
      return res.json({
        ok: true,
        message: 'No se encontraron categorias.',
      });
    }

    return res.json({
      ok: true,
      message: 'Categorias obtenidas correctamente.',
      categories,
    });

  } catch (error) {
    console.error(error);
    return res.status(500).json({
      ok: false,
      message: 'Error al intentar obtener las categorias.',
      error,
    });
  }
}

async function getCategory(req, res){
  try {
    const categoryId = req.params.id;
    const category = await Category.findById(categoryId);
    if(category === null){
      return res.status(404).json({
        ok: true,
        message: 'No se pudo obtener. La categoria no existe.'
      });
    }

    return res.json({
      ok: true,
      message: 'Categoria encontrada.',
      category
    });

  } catch (error) {
    console.error(error);
    return res.status(500).json({
      ok: false,
      message: 'Error al intentar obtener la categoria.',
      error,
    });
  }
}

async function createCategory(req, res){
  try {
    let comingCategory = new Category(req.body);
    const newCategory = await comingCategory.save();
    return res.status(201).json({
      ok: true,
      message: 'Categoria creada correctamente.',
      newCategory,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      ok: false,
      message: 'Error al crear una nueva categoria.',
      error,
    });
  }
}

async function updateCategory(req, res){
  try {
    if(req.body.constructor === Object && Object.keys(req.body).length === 0){
      return res.status(400).json({
        ok: false,
        message: 'Cuerpo de solicitud vacia.'
      });
    }

    const categoryId = req.params.id;
    const categoryDataToUpdate = req.body;
    const updatedCategory = await Category.findByIdAndUpdate(categoryId, categoryDataToUpdate, { new: true, runValidators: true, context: 'query' });
    if(updatedCategory === null){
      return res.status(404).json({
        ok: true,
        message: 'No se pudo modificar. La categoria no existe.',
      });
    }

    return res.json({
      ok: true,
      message: 'Categoria modificada.',
      updatedCategory,
    });

  } catch (error) {
    console.error(error);
    return res.status(500).json({
      ok: false,
      message: 'Error al intentar actualizar la categoria.',
      error,
    });
  }
}

async function deleteCategory(req, res){
  try {
    const categoryId = req.params.id;
    const deletedCategory = await User.findByIdAndDelete(categoryId);
    if(deletedCategory === null){
      res.status(404).json({
        ok: true,
        message: 'No se pudo eliminar. La categoria no existe',
      });
    }

    return res.json({
      ok: true,
      message: 'Categoria eliminada.',
      deletedCategory,
    });

    
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      ok: false,
      message: 'Error al intentar eliminar la categoria.',
      error,
    });
  }
}

module.exports = {
  getCategories,
  getCategory,
  createCategory,
  updateCategory,
  deleteCategory,
};