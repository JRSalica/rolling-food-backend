const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const uniqueValidator = require('mongoose-unique-validator');


const bcrypt = require('bcrypt');
const SALT_WORK_FACTOR = 10;


const VALID_ROLES = [
  'ADMIN_ROLE',
  'USER_ROLE',
];

const UserSchema = new Schema({
  fullName: { 
    type: String, 
    required: [true, 'Debe ingresar un nombre.'],
    minLength: [2, 'El nombre debe tener mas de 2 caracteres.'],
    maxLength: [30, 'El nombre no debe superar los 30 caracteres.'],
    match: [/^[a-zA-Z ]*$/, 'El nombre solo debe contener letras.'],
  },
  email: {
    type: String,
    required: [true, 'Debe ingresar un mail.'],
    match: [/.+@.+\..+/, 'El valor ingresado no corresponde a un email.'],
    unique: true,
    uniqueCaseInsensitive: true,
    index: true,
    // validate: [uniqueEmailValidator, 'El email ingresado ya esta en uso.'],
  },
  password: {
    type: String,
    required: [true, 'Debe ingresar una contraseña.'],
    minLength: [6, 'Debe ingresar una contraseña mas larga.'],
    select: false,
  },
  active: {
    type: Boolean,
    required: true,
    default: false,
  },
  role: {
    type: String,
    enum: VALID_ROLES,
    default: VALID_ROLES[1],
  },
}, { timeStamps: true });

UserSchema.plugin(uniqueValidator, {message: 'El email ingresado ya se encuentra registrado. Utilice otro.'});
// runValidators: true, context: 'query' --> when findOneAndUpdate()

UserSchema.pre('save', async function(next){
  try{
    var user = this;

    if(!user.isModified('password')) return next();
    user.password = await bcrypt.hash(user.password, SALT_WORK_FACTOR);
    next();

  } catch(error) {
    throw console.error('Error de encriptado.', error);
  }
});

UserSchema.methods.comparePassword = async function(candidatePassword){
  try {
    if(await bcrypt.compare(candidatePassword, this.password)) return true;
    return false;

  } catch (error) {
    throw console.error('Error de desencriptado.', error)
  }

}

UserSchema.set('toJSON', { transform: (document, returnedObject) => {
  delete returnedObject._id;
  delete returnedObject.__v; 
  delete returnedObject.password;
}});

module.exports = mongoose.model('User', UserSchema);

// async function uniqueEmailValidator(email){
//   const user = await this.constructor.findOne({ email });
//   if(user){
//     if(this.id === user.id) return true;
//     return false;
//   }
//   return true;
// }