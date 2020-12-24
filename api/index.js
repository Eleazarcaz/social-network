const express = require('express');
const debug = require('debug')('app:server');
const user = require('./components/user/network');
const auth = require('./components/auth/network');
const { api } = require('../config');
const {
  logError,
  wrapError,
  errorHandler,
} = require('../utils/middleware/errorHandler');
const notFoundHandler = require('../utils/middleware/notFoundHandler');

const app = express();

app.use(express.json());

// Rutas
app.use('/api/user', user);
app.use('/api/login', auth);

// catch not found 404
app.use(notFoundHandler);

// catch error
app.use(logError);
app.use(wrapError);
app.use(errorHandler);

app.listen(api.port, () => debug(`Servidor en el puerto ${api.port}`));
