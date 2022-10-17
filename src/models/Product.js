const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ProductSchema = new Schema({
  name: {
    type: String,
    required: [true, 'Debe ingresar un nombre para el producto.'],
    minLength: [2, 'El nombre del producto debe tener al menos 2 caracteres.'],
    maxLength: [50, 'El nombre del producto debe tener menos de 50 caracteres.'],
    match: [/^[a-zA-Z ]*$/, 'El nombre del producto solo debe contener letras y espacios.'],
  },
  description: {
    type: String,
    required: true,
    maxLength: [200, 'Ingrese una descripcion mas corta.'],
    default: 'Sin descripcion.',
  },
  price: {
    type: Number,
    required: true,
    min: [0, 'El valor debe ser mayor a 0.'],
    max: [10000, 'El valor no debe superar los 10000.'],
    match: [/(^\d{1,10})/, 'Solo numeros enteros y positivos.']
  },
  category: {
    type: mongoose.Schema.Types.ObjectId,
    required: [true, 'Debe seleccionar una categoria para el producto.'],
    ref: 'Category',
  },
  active: {
    type: Boolean,
    required: true,
    default: false,
  },
}, { timeStamps: true });

ProductSchema.set('toJSON', {
  transform: (document, returnedProduct) => {
    returnedProduct.id = returnedProduct._id;
    delete returnedProduct._id;
    delete returnedProduct.__v;
  }
});

module.exports = mongoose.model('Product', ProductSchema);