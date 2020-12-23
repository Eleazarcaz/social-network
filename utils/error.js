function logErrors(err, req, res, next) {
  console.log(err.stack);
  next(err);
}

function error(message, code) {
  const e = new Error(message);

  if (code) {
    e.statusCode = code;
  }

  return e;
}

module.exports = error;
