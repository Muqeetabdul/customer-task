import { Strategy as JwtStrategy, ExtractJwt, VerifiedCallback, VerifyCallbackWithRequest } from 'passport-jwt';
import config from './config';
import tokenTypes from './tokens';
import { User } from '../models/index.model';

const jwtOptions = {
  secretOrKey: config.jwt.secret,
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
};

const jwtVerify = async (payload: { [k: string]: string }, done: any): Promise<VerifiedCallback> => {
  try {
    if (payload.type !== tokenTypes.ACCESS) {
      throw new Error('Invalid token type');
    }        
    const user = await User.findById(payload.sub);
    if (!user) {
      return done(null, false);
    }
    done(null, user);
  } catch (error) {
    done(error, false);
  }
};

const jwtStrategy = new JwtStrategy(jwtOptions, jwtVerify);
export { jwtStrategy };