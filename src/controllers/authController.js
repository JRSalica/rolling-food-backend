const User = require('../models/User');


async function registerUser(req, res){
  try {
    // let existentUser = await User.findOne({ email: req.body.email });
    // if(existentUser){
    //   return res.status(409).json({
    //     ok: false,
    //     message: 'El email ingresado ya se encuentra registrado. Use otro.',
    //   });
    // }

    let comingUser = new User(req.body);
    const registeredUser = await comingUser.save();
    return res.status(201).json({
      ok: true,
      message: 'Usuario creado correctamente.',
      registeredUser,
    });

  } catch (error) {
    console.error(error);
    return res.status(500).json({
      ok: false,
      message: 'Error al crear un nuevo usuario. Verificar detalles del error a continuacion...',
      error,
    });
  }
}

async function loginUser(req, res){
  try{
    
  } catch(error) {

  }
}

module.exports = {
  registerUser,
  loginUser,
}