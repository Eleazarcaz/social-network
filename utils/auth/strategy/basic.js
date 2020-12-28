const passport = require('passport');
const { BasicStrategy } = require('passport-http');
const boom = require('@hapi/boom');
const bcrypt = require('bcrypt');
const { get: getUser } = require('../../../api/components/user/index');

passport.use(
  new BasicStrategy(async (email, password, done) => {
    const user = await getUser(null, email).catch((error) => done(error));
    if (!user) {
      return done(boom.unauthorized());
    }
    if (!(await bcrypt.compare(password, user.password))) {
      return done(boom.unauthorized(), false);
    }
    delete user.password;
    return done(null, user);
  }),
);
