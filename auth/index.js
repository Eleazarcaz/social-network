const config = require('../config');
const jwt = require('jsonwebtoken');

const secret = config.jwt.secret;

function sign(data) {
  const dataParse = JSON.parse(JSON.stringify(data));
  return jwt.sign(dataParse, secret);
}

function verify(token) {
  return jwt.verify(token, secret);
}

function getToken(auth) {
  if (!auth) {
    throw new Error('Token not found');
  }

  if (auth.indexOf('Bearer ') === -1) {
    throw new Error('Token not found');
  }

  let token = auth.replace('Bearer ', '');
  return token;
}

function decodeHeader(req) {
  const authorization = req.headers.authorization || '';
  const token = getToken(authorization);
  const decoded = verify(token);

  req.user = decoded;

  return decoded;
}

const check = {
  own: function (req, owner) {
    const decoded = decodeHeader(req);
    if (decoded.id.toString() !== owner) {
      throw new Error("You don't edit this");
    }
  },
  logged: function (req) {
    decodeHeader(req);
  },
};

module.exports = {
  sign,
  check,
};
