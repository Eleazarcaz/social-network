const express = require("express");
const response = require("../../../network/response");
const Controller = require("./index");
const secure = require("./secure");

const router = express.Router();

router.get("/", (req, res) => {
  Controller.list()
    .then((lista) => {
      response.success(req, res, lista, 200);
    })
    .catch((err) => {
      response.error(req, res, err, 500);
    });
});

router.get("/:id", (req, res) => {
  Controller.get(req.params.id)
    .then((user) => {
      response.success(req, res, user, 200);
    })
    .catch((err) => {
      response.error(req, res, err, 404);
    });
});

router.post("/", (req, res) => {
  Controller.add(req.body)
    .then((user) => {
      response.success(req, res, user, 200);
    })
    .catch((err) => {
      response.error(req, res, err, 500);
    });
});

router.put("/:id", secure("update"), (req, res) => {
  Controller.update(req.params.id, req.body)
    .then((user) => {
      response.success(req, res, user, 200);
    })
    .catch((err) => {
      response.error(req, res, err, 500);
    });
});

router.delete("/:id", (req, res) => {
  Controller.remove(req.params.id)
    .then((message) => {
      response.success(req, res, message, 200);
    })
    .catch((err) => {
      response.error(req, res, err, 404);
    });
});

module.exports = router;
