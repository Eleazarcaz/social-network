const passport = require('passport');
const JwtStrategy = require('passport-jwt').Strategy;
const ExtractJwt = require('passport-jwt').ExtractJwt;
const boom = require('@hapi/boom');
const config = require('../../../config');
const { get: getUser } = require('../../../api/components/user/index');

passport.use(
  new JwtStrategy(
    {
      secretOrKey: config.jwt.secret,
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
    },
    async (jwt_payload, done) => {
      const user = await getUser(jwt_payload.sub).catch((err) => done(err));
      if (!user) {
        return done(boom.unauthorized());
      }
      delete user.password;
      return done(null, user);
    },
  ),
);
