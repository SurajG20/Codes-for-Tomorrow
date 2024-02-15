import jwt from 'jsonwebtoken';
import { TokenUser } from './createTokenUser';

const jwtSecret = process.env.JWTSECRET;
const jwtLifetime = process.env.JWTLIFETIME;

const createJwt = ({ payload }: { payload: TokenUser }) => {
  const token = jwt.sign(payload, jwtSecret as string, {
    expiresIn: jwtLifetime,
  });
  return token;
};

const isTokenValid = ({ token }: { token: String }):TokenUser => {
  const decodedPayload = jwt.verify(token as string, jwtSecret as string);
  return decodedPayload as TokenUser;
};

export { createJwt, isTokenValid };
