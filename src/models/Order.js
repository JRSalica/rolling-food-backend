const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const OrderSchema = new Schema({
  products: [
    {
      productId: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'Product',
      },
      quantity: {
        type: Number,
        required: [true, 'Debe ingresar la cantidad solicitada del producto.'],
      },
      totalPrice: {
        type: Number,
        required: true,
      }
    },
  ],
  user: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: 'User',
  },
  createdAt: {
    type: Date,
    required: true,
    default: Date.now,
  },
  amount: {
    type: Number,
    required: true,
    min: [],
    max: [],
  }
}, { timestamps: true });

OrderSchema.set('toJSON', { transform: (document, returnedObject) =>{
  delete returnedObject.__v;
}});

module.exports = mongoose.model('Order', OrderSchema);