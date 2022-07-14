const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const CategorySchema = new Schema({
  name: {
    type: String,
    required: [true, 'Debe ingresar un nombre para la categoria.'],
    minlength: [2, 'El nombre de la categoria debe tener al menos 2 caracteres.'],
    maxlength: [20, 'El nombre de la categoria no debe superar los 20 caracteres.'],
    match: [/^[a-zA-Z ]*$/, 'El nombre de la categoria solo puede contener letras.'],
  },
  active: {
    type: Boolean,
    required: true,
    default: false,
  },
});

CategorySchema.set('toJSON', { transform: (document, returnedObject) =>{
  delete returnedObject.__v;
}});

module.exports = mongoose.model('Category', CategorySchema);