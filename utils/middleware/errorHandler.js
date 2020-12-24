const boom = require('@hapi/boom');
const debug = require('debug')('app:server');

function withErrorStack(err, stack) {
  if (!process.env.NODE_ENV === 'production') {
    next({ ...err, stack });
  }
  return err;
}

function logError(err, req, res, next) {
  debug(err);
  next(err);
}

function wrapError(err, req, res, next) {
  if (!err.isBoom) {
    next(boom.badImplementation(err));
  }
  next(err);
}

function errorHandler(err, req, res, next) {
  const {
    output: { statusCode, payload },
  } = err;
  res.status(statusCode).json(withErrorStack(payload, err.stack));
}

module.exports = {
  logError,
  wrapError,
  errorHandler,
};
