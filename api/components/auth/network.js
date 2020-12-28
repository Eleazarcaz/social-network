const express = require('express');
const passport = require('passport');
const jwt = require('jsonwebtoken');
const boom = require('@hapi/boom');
const config = require('../../../config');
const validationHandler = require('../../../utils/middleware/validationHandler');
const { createUserSchema } = require('../../../utils/schema/user');
const { add } = require('../user/index');
const router = express.Router();

require('../../../utils/auth/strategy/basic');
router.post('/sign-in', async (req, res, next) => {
  passport.authenticate('basic', { session: false }, (err, user) => {
    try {
      if (err || !user) {
        return next(boom.unauthorized());
      }
      req.login(user, { session: false }, (error) => {
        if (error) {
          next(error);
        }
        const { id, nickname, email } = user;
        const payload = {
          sub: id,
          nickname: nickname,
          email: email,
        };

        const token = jwt.sign(payload, config.jwt.secret, {
          expiresIn: '15m',
        });

        return res.status(200).json({ token, user: { id, nickname, email } });
      });
    } catch (error) {
      next(error);
    }
  })(req, res, next);
});

router.post(
  '/sign-up',
  validationHandler(createUserSchema),
  async (req, res, next) => {
    const { body: user } = req;
    try {
      const createdUserId = await add(user);
      res.status(201).json({ data: createdUserId, message: 'user created' });
    } catch (error) {
      next(error);
    }
  },
);

module.exports = router;
