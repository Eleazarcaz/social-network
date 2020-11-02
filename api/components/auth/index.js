const control = require('./controller');
const store = require('../../../store/mysql');

module.exports = control(store);
