const express = require('express');
const response = require('../../../network/response');
const Controller = require('./index');
const secure = require('./secure');

const router = express.Router();

router.get('/', (req, res, next) => {
  Controller.list()
    .then((lista) => {
      response.success(req, res, lista, 200);
    })
    .catch(next);
});

router.get('/:id', (req, res, next) => {
  Controller.get(req.params.id)
    .then((user) => {
      response.success(req, res, user, 200);
    })
    .catch(next);
});

router.post('/', (req, res, next) => {
  Controller.add(req.body)
    .then((user) => {
      response.success(req, res, user, 200);
    })
    .catch(next);
});

router.put('/:id', secure('update'), (req, res, next) => {
  Controller.update(req.params.id, req.body)
    .then((user) => {
      response.success(req, res, user, 200);
    })
    .catch(next);
});

router.delete('/:id', (req, res, next) => {
  Controller.remove(req.params.id)
    .then((message) => {
      response.success(req, res, message, 200);
    })
    .catch(next);
});

module.exports = router;
