import { Response } from 'express';
import { UserRequest } from '../middlewares/authentication';
import { StatusCodes } from 'http-status-codes';

const getUserData = (req: UserRequest, res: Response) => {
  res.status(StatusCodes.ACCEPTED).json(req.user);
};

export { getUserData };
