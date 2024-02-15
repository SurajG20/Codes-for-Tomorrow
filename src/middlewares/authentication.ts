import { StatusCodes } from 'http-status-codes';
import CustomError from '../errors';
import { NextFunction, Request, Response } from 'express';
import { isTokenValid } from '../utils/jwt';
import { TokenUser } from '../utils/createTokenUser';

export interface UserRequest extends Request {
  user?: TokenUser;
}

const authenticateUser = (
  req: UserRequest,
  res: Response,
  next: NextFunction
) => {
  let token: string;
  const authHeader = req.headers.authorization;

  if (!authHeader) {
    throw new CustomError.BadRequestError('Invalid Request');
  }
  if (authHeader && authHeader.startsWith('Bearer')) {
    token = authHeader.split(' ')[1];
    try {
      const { firstname, lastname, email } = isTokenValid({ token: token });
      req.user = { firstname, lastname, email };
    } catch (error) {
      throw new CustomError.UnauthenticatedError('Authentication Invalid');
    }
  }
  next();
};

export { authenticateUser };
