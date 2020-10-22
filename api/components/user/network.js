const express = require("express");
const response = require("../../network/response");
const Controller = require("./controller");

const router = express.Router();

router.get("/", (req, res) => {
  const data = Controller.list();
  response.success(req, res, data);
});

module.exports = router;
