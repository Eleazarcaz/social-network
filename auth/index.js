const config = require("../config");
const jwt = require("jsonwebtoken");
const error = require("../utils/error");

const secret = config.jwt.secret;

function sign(data) {
  return jwt.sign(data, secret);
}

function verify(token) {
  return jwt.verify(token, secret);
}

function getToken(auth) {
  if (!auth) {
    throw error("Token not found", 400);
  }

  if (auth.indexOf("Bearer ") === -1) {
    throw error("Token not found", 400);
  }

  let token = auth.replace("Bearer ", "");
  return token;
}

function decodeHeader(req) {
  const authorization = req.headers.authorization || "";
  const token = getToken(authorization);
  const decoded = verify(token);

  req.user = decoded;

  return decoded;
}

const check = {
  own: function (req, owner) {
    const decoded = decodeHeader(req);
    if (decoded.id !== owner) {
      throw error("You don't edit this", 401);
    }
  },
};

module.exports = {
  sign,
  check,
};
