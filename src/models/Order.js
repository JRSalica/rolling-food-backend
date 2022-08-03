const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// const Product = require('./Product');

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
      totalPrice: {
        type: Number,
      }
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
  amount: {
    type: Number,
  }
}, { timestamps: true });

// OrderSchema.pre('save', async function(next){
//   try {
//     this.amount = 0;
//     this.products.forEach(async (product) => {
//       product.totalPrice = 0;
//       productInfo = await Product.findById(product.productId);
//       console.log(productInfo.price);
//       product.totalPrice = product.quantity * productInfo.price;
//       console.log(product.totalPrice);
//       this.amount = this.amount + product.totalPrice;
//     });
//     next();
//   } catch (error) {
//     throw console.error('Error al calcular montos.', error);
//   }
// });

OrderSchema.set('toJSON', { transform: (document, returnedObject) =>{
  delete returnedObject.__v;
}});

module.exports = mongoose.model('Order', OrderSchema);