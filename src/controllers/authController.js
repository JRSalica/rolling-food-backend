const User = require('../models/User');


async function registerUser(req, res) {
  try {
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
      message: 'Error al crear un nuevo usuario.',
      error,
    });
  }
}

async function loginUser(req, res) {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email }).select('+password');

    if (user === null) {
      return res.status(404).json({
        ok: false,
        message: 'No existe un usuario registrado con ese email.'
      });
    }

    if (await user.comparePassword(password) === false) {
      return res.status(401).json({
        ok: false,
        message: 'Contraseña incorrecta.'
      });
    }


    if (user.active === false) {
      return res.status(401).json({
        ok: false,
        message: 'El usuario no se encuentra activo.'
      })
    }

    const token = await user.generateAuthToken()
    res.json({
      ok: true,
      message: 'Ingreso exitoso.',
      user,
      token,
    });

  } catch (error) {
    console.error(error);
    return res.status(500).json({
      ok: false,
      message: 'Error al intentar ingresar.',
      error,
    });
  }
}

module.exports = {
  registerUser,
  loginUser,
}