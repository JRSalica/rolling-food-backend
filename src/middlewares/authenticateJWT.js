const jwt = require('jsonwebtoken');

function authenticateJWT(req, res, next){
  try {
    const authHeader = req.headers.authorization;

    if(!authHeader){
      res.status(400).json({
        ok: false,
        message: 'No se pudo completar la autenticacion. Encabezado de autorizacion sin datos.'
      });
    }

    const accessToken = authHeader.split(' ')[1];
    let decodedUser = jwt.verify(accessToken, process.env.SECRET);
    req.user = decodedUser;
    next();

  } catch (error) {
    console.error(error);
    return res.status(500).json({
      ok: false,
      message: 'Error al autenticar usuario.',
      error,
    });
  }
}

module.exports = authenticateJWT;