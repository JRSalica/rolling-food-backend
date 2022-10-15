const Order = require('../models/Order');

async function getOrders(req, res) {
  try {
    orders = await Order.find({}).populate('products.productId').populate('user');

    if (orders.length === 0) {
      return res.json({
        ok: true,
        message: 'No se encontraron ordenes.',
      });
    }

    return res.json({
      ok: true,
      message: 'Ordenes obtenidas correctamente.',
      orders,
    });

  } catch (error) {
    console.error(error);
    return res.status(500).json({
      ok: false,
      message: 'Error al intentar obtener las ordenes.',
      error,
    });
  }
}

async function getOrder(req, res) {
  try {
    const orderId = req.params.id;
    const order = await Order.findById(orderId);
    if (order === null) {
      return res.status(404).json({
        ok: true,
        message: 'No se pudo obtener. La orden no existe.'
      });
    }

    return res.json({
      ok: true,
      message: 'Orden encontrada.',
      order
    });

  } catch (error) {
    console.error(error);
    return res.status(500).json({
      ok: false,
      message: 'Error al intentar obtener la orden solicitada.',
      error,
    });
  }
}

async function createOrder(req, res) {
  try {
    let comingOrder = new Order(req.body);
    const newOrder = await comingOrder.save();
    return res.status(201).json({
      ok: true,
      message: 'Order creada correctamente.',
      newOrder,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      ok: false,
      message: 'Error al crear la orden.',
      error,
    });
  }
}

async function updateOrder(req, res) {
  try {
    if (req.body.constructor === Object && Object.keys(req.body).length === 0) {
      return res.status(400).json({
        ok: false,
        message: 'Cuerpo de solicitud vacia.'
      });
    }

    const orderId = req.params.id;
    const orderDataToUpdate = req.body;
    const updatedOrder = await Order.findByIdAndUpdate(orderId, orderDataToUpdate, { new: true, runValidators: true, context: 'query' });
    if (updatedOrder === null) {
      return res.status(404).json({
        ok: true,
        message: 'No se pudo modificar. La orden no existe.',
      });
    }

    return res.json({
      ok: true,
      message: 'Orden modificada.',
      updatedOrder,
    });

  } catch (error) {
    console.error(error);
    return res.status(500).json({
      ok: false,
      message: 'Error al intentar modifcar la orden.',
      error,
    });
  }
}

async function deleteOrder(req, res) {
  try {
    const orderId = req.params.id;
    const deletedOrder = await User.findByIdAndDelete(orderId);
    if (deletedOrder === null) {
      res.status(404).json({
        ok: true,
        message: 'No se pudo eliminar. La orden no existe',
      });
    }

    return res.json({
      ok: true,
      message: 'Orden eliminada.',
      deletedOrder,
    });

  } catch (error) {
    console.error(error);
    return res.status(500).json({
      ok: false,
      message: 'Error al intentar eliminar la orden.',
      error,
    });
  }
}

module.exports = {
  getOrders,
  getOrder,
  createOrder,
  updateOrder,
  deleteOrder,
};