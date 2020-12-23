const express = require("express");
const response = require("../../../network/response");
const { list, get, add, update, follow} = require("./index");
const validationHandler = require("../../../utils/middleware/validationHandler");
const {createUserSchema} = require('../../../utils/schema/user')
const secure = require("./secure");

const router = express.Router();

router.get("/", getUsers);
router.get("/:id", getUser);
router.post("/", validationHandler(createUserSchema), addUser);
router.put("/:id", secure("update"), updateUser);
router.delete("/:id", secure("delete"), deleteUser);
router.post("/follow/:id", secure("follow"), followUser);

async function getUsers(req, res, next) {
  try {
    const users = await list();
    response.success(req, res, users, 200);
  } catch (error) {
    next(error);
  }
}

async function getUser(req, res, next) {
  try {
    const user = await get(req.params.id);
    response.success(req, res, user, 200);
  } catch (error) {
    next(error);
  }
}

async function addUser(req, res, next) {
  try {
    const user = await add(req.body);
    response.success(req, res, user, 200);
  } catch (error) {
    next(error);
  }
}

async function updateUser(req, res, next) {
  try {
    const user = await update(req.params.id, req.body);
    response.success(req, res, user, 200);
  } catch (error) {
    next(error);
  }
}

async function deleteUser(req, res, next) {
  try {
    const message = remove(req.params.id);
    response.success(req, res, message, 200);
  } catch (error) {
    next(error);
  }
}

async function followUser(req, res, next) {
  try {
    const message = await follow(req.params.id, req.user.id);
    response.success(req, res, message, 200);
  } catch (error) {
    next(error);
  }
}

module.exports = router;
