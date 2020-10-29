const auth = require("../../../auth/index");

module.exports = function checkAuth(action) {
  function middleware(req, res, next) {
    debugger;
    switch (action) {
      case "update":
        const owner = req.params.id;
        auth.check.own(req, owner);
        next();

        break;

      default:
        next();
    }
  }

  return middleware;
};
