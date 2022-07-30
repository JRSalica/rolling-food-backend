const Product = require('../models/Product');

async function getProducts(req, res){
  try {
    products = await Product.find({ }).populate('category');

    if(products.length === 0){
      return res.json({
        ok: true,
        message: 'No se encontraron productos.'
      });
    }

    return res.json({
      ok: true,
      message: 'Productos obtenidos correctamente.',
      products,
    });

  } catch (error) {
    console.error(error);
    return res.status(500).json({
      ok: false,
      message: 'Error al intentar obtener los productos.',
      error,
    });
  }
}

async function getProduct(req, res){
  try {
    const productId = req.params.id;
    const product = await Product.findById(productId);
    if(product === null){
      return res.status(404).json({
        ok: true,
        message: 'No se pudo obtener. El producto no existe.',
      });
    }

    return res.json({
      ok: true,
      message: 'Producto encontrado.',
      product
    });

  } catch (error) {
    console.error(error);
    return res.status(500).json({
      ok: false,
      message: 'Error al intentar obtener el producto solicitado.',
      error,
    });
  }
}

async function createProduct(req, res){
  try {
    let comingProduct = new Product(req.body);
    const newProduct = await comingProduct.save();
    return res.status(201).json({
      ok: true,
      message: 'Producto creado correctamente.',
      newProduct,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      ok: false,
      message: 'Error al crear producto.',
      error
    });
  }
}

async function updateProduct(req, res){
  try {
    if(req.body.constructor === Object && Object.keys(req.body).length === 0){
      return res.status(400).json({
        ok: false,
        message: 'Cuerpo de solicitud vacia.',
      });
    }

    const productId = req.params.id;
    const productDataToUpdate = req.body;
    const updateProduct = await Product.findByIdAndUpdate(productId, productDataToUpdate, { new: true, runValidators: true, context: 'query' });
    if(updateProduct === null){
      return res.status(404).json({
        ok: true,
        message: 'No se puede modificar. El usuario no existe.'
      });
    }

    return res.json({
      ok: true,
      message: 'Producto modificado.',
      updateProduct,
    });

  } catch (error) {
    console.error(error);
    return res.status(500).json({
      ok: false,
      message: 'Error al intentar modificar el producto.',
      error,
    });
  }
}

async function deleteProduct(req, res){
  try {
    const productId = req.params.id;
    const deletedProduct = await Product.findByIdAndDelete(productId);
    if(deletedProduct === null){
      return res.status(404).json({
        ok: true,
        message: 'No se pudo eliminar. El producto no existe.',
      });
    }

    return res.json({
      ok: true,
      message: 'Producto eliminado.',
      deletedProduct,
    });

  } catch (error) {
    console.error(error);
    return res.status(500).json({
      ok: false,
      message: 'Error al intentar eliminar el producto.',
      error,
    });
  }
}

module.exports = {
  getProducts,
  getProduct,
  createProduct,
  updateProduct,
  deleteProduct,
};