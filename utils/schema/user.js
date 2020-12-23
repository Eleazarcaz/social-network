const joi = require("joi");

const userIdSchema = joi.number().integer();
const userNicknameSchema = joi.string().min(3).alphanum();
const userPasswordSchema = joi.string().min(8).max(30);
const userEmailSchema = joi.string().email();

const createUserSchema = {
  nickname: userNicknameSchema.required(),
  password: userPasswordSchema.required(),
  email: userEmailSchema.required(),
};

module.exports = {
  userIdSchema,
  createUserSchema,
};
