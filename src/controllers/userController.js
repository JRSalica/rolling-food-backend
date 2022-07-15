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
      message: 'Error al intentar obtener los usuarios.',
      error,
    });
  }
}

async function getUser(req, res){
  try {
    const userId = req.params.id;
    const user = await User.findById(userId);
    if(user === null){
      return res.status(404).json({
        ok: true,
        message: 'No se pudo obtener. El usuario no existe.'
      });
    }

    return res.json({
      ok: true,
      message: 'Usuario encontrado.',
      user
    });

  } catch (error) {
    console.error(error);
    return res.status(500).json({
      ok: false,
      message: 'Error al intentar obtener el usuario.',
      error
    });
  }
}

async function updateUser(req, res){
  try {
    if(req.body.constructor === Object && Object.keys(req.body).length === 0){
      return res.status(400).json({
        ok: false,
        message: 'Cuerpo de solicitud vacia.'
      });
    }

    if(req.body.password){
      return res.status(400).json({
        ok: false,
        message: 'No se puede modificar contraseñas por este medio',
      });
    }
    
    const userId = req.params.id;
    const userDataToUpdate = req.body;
    const updatedUser = await User.findByIdAndUpdate(userId, userDataToUpdate, { new: true, runValidators: true, context: 'query' });
    if(updatedUser === null){
      return res.status(404).json({
        ok: true,
        message: 'No se pudo modificar. El usuario no existe.',
      });
    }

    return res.json({
      ok: true,
      message: 'Usuario modificado.',
      updatedUser,
    });

  } catch (error) {
    console.error(error);
    return res.status(500).json({
      ok: false,
      message: 'Error al intentar modificar usuario.',
      error,
    });
  }
}

async function deleteUser(req, res){
  try {
    const userId = req.params.id;
    const deletedUser = await User.findByIdAndDelete(userId);
    if(deletedUser === null){
      res.status(404).json({
        ok: true,
        message: 'No se pudo eliminar. El usuario no existe',
      });
    }

    return res.json({
      ok: true,
      message: 'Usuario eliminado.',
      deletedUser,
    });

  } catch (error) {
    console.error(error);
    return res.status(500).json({
      ok: false,
      message: 'Error al intentar eliminar el usuario.',
      error,
    });
  }
}

module.exports = {
  getUsers,
  getUser,
  updateUser,
  deleteUser,
};