const errorResponse = (messageBody, codeStatus, error) => {
  return res.status(codeStatus).json({
    ok: false,
    message: messageBody,
    error,
  });
}

module.exports = {
  errorResponse,
}