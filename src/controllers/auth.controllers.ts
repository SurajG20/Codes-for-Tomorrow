import { Request, Response } from 'express';
import UserModel, { User } from '../models/Users';
import bcrypt from 'bcrypt';
import CustomError from '../errors';
import { StatusCodes } from 'http-status-codes';
import { TokenUser, createTokenUser } from '../utils/createTokenUser';
import { createJwt } from '../utils/jwt';

const Register = async (req: Request, res: Response) => {
  const { firstname, lastname, email, password } = req.body;

  if (!firstname && !lastname && !email && !password) {
    throw new CustomError.BadRequestError(
      'Please Check If all data is provided'
    );
  }

  const IsEmailUnique = await UserModel.findOne({ email });
  if (IsEmailUnique) {
    throw new CustomError.BadRequestError('Email Already Exists');
  }

  const HashedPassword = await bcrypt.hash(password, 10);
  const user = await UserModel.create({
    firstname,
    lastname,
    email,
    password: HashedPassword,
  });
  res.status(StatusCodes.CREATED).json(user);
};
const Login = async (req: Request, res: Response) => {
  const { email, password } = req.body;
  if (!email && !password) {
    throw new CustomError.BadRequestError('Please Provide All Data');
  }
  const UserData = await UserModel.findOne({ email });
  if (!UserData) {
    throw new CustomError.BadRequestError('Email Do not exists');
  }
  const ComparePassword = await bcrypt.compare(password, UserData.password);

  if (!ComparePassword) {
    throw new CustomError.BadRequestError('Incorrect Password, Try Again !!');
  }

  const tokenUser: TokenUser = createTokenUser(UserData);
  const token = createJwt({ payload: tokenUser });
  res.status(StatusCodes.ACCEPTED).json({ tokenUser, token });
};

export { Register, Login };
