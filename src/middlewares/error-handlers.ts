import { Request, Response, NextFunction } from 'express';
import CustomApiError from '../errors/custom-error';
import { StatusCodes } from 'http-status-codes';

const errorHandlerMiddleware = (
  req: Request,
  res: Response,
  err: any,
) => {
  if (err instanceof CustomApiError) {
   return res.status(StatusCodes.BAD_REQUEST).json({ err });
  }
  return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ err });
};

export default errorHandlerMiddleware;
