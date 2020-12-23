function logError(err, req, res, next) {
  console.log(err);
  next(err);
}

function clientErrorHandler(err, req, res, next) {
  if (req.xhr) {
    res.status(500).send({ error: "Something failed" });
  } else {
    next(error);
  }
}

function errorHandler(err, req, res, next) {
  res.status(500);
  res.send("paso otra cosa");
}

module.exports = {
logError,
  clientErrorHandler,
  errorHandler,

}
