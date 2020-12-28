const joi = require('joi');

const userIdSchema = joi.number().integer();
const userNicknameSchema = joi.string().min(3).alphanum();
const userPasswordSchema = joi.string().min(8).max(30);
const userEmailSchema = joi.string().email();

const createUserSchema = {
  nickname: userNicknameSchema.required(),
  password: userPasswordSchema.required(),
  password_repeat: joi.ref('password'),
  email: userEmailSchema.required(),
};

const updateUserSchema = {
  nickname: userNicknameSchema.required(),
  password: userPasswordSchema.required(),
  password_repeat: joi.ref('password'),
  email: userEmailSchema.required(),
};

module.exports = {
  userIdSchema,
  createUserSchema,
  updateUserSchema,
};
