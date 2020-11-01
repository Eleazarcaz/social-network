const store = require('../../../store/mysql');
const control = require('./controller');

module.exports = control(store);
