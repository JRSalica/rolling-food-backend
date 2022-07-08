const User = require('../models/User');

async function getUsers(req, res){
  try {
    users = await User.find({ });

    if(users.length === 0){
      return res.json({
        ok: true,
        message: 'No se encontraron usuarios.',
      });
    }

    return res.json({
      ok: true,
      message: 'Usuarios obtenidos correctamente.',
      users,
    });

  } catch (error) {
    console.error(error);
    return res.status(500).json({
      ok: false,
      message: 'Error al obtener los usuarios. Verificar detalles del error a continuacion...',
      error,
    });
  }
}

module.exports = {
  getUsers,
};