const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const VALID_STATUS = [
  'PENDING',
  'PLACED',
  'CANCELLED',
];

const OrderSchema = new Schema({
  products: [
    {
      productId: {
        type: String,
        required: true,
        ref: 'Product',
      },
      quantity: {
        type: Number,
        required: [true, 'Debe ingresar la cantidad solicitada del producto.'],
      },
    },
  ],
  user: {
    type: String,
    required: true,
    ref: 'User',
  },
  createdAt: {
    type: Date,
    required: true,
    default: Date.now,
  },
  total: {
    type: Number,
  },
  status: {
    type: String,
    enum: VALID_STATUS,
    default: VALID_STATUS[0],
  },
}, { timestamps: true });

OrderSchema.set('toJSON', {
  transform: (document, returnedObject) => {
    delete returnedObject.__v;
  }
});

module.exports = mongoose.model('Order', OrderSchema);