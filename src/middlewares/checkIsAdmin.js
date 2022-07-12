function checkIsAdmin(req, res, next){
  if(req.user.role !== 'ADMIN_ROLE'){
    return res.status(401).json({
      ok: false,
      message: 'No tiene permisos para realizar esta accion.',
    });
  }
  next();
}

module.exports = checkIsAdmin;