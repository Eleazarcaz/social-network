const express = require('express');
const response = require('../../../network/response');
const Controller = require('./index');

const router = express.Router();

router.post('/', (req, res) => {
  Controller.login(req.body)
    .then((token) => {
      response.success(req, res, token, 200);
    })
    .catch((err) => {
      response.error(req, res, err, 500);
    });
});

module.exports = router;
