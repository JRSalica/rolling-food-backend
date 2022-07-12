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
    const { email, password } = req.body;
    const user = await User.findOne({ email }).select('+password');

    if(user === null){
      return res.status(404).json({
        ok: false,
        message: 'No existe un usuario registrado con ese email.'
      });
    }

    if(await user.comparePassword(password) === false){
      return res.status(401).json({
        ok: false,
        message: 'Contraseña incorrecta.'
      });
    }

    if(user.active === false){
      return res.status(401).json({
        ok: false,
        message: 'El usuario no se encuentra activo.'
      })
    }

    const accessToken = await user.generateAuthToken()
    res.json({
      ok: true,
      message: 'Ingreso exitoso.',
      accessToken,
    });

  } catch(error) {
    console.error(error);
    return res.status(500),json({
      ok: false,
      message: 'Error al intentar ingresar. Verificar detalles del error a continuacion...',
      error,
    });
  }
}

module.exports = {
  registerUser,
  loginUser,
}