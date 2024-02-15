import { User } from '../models/Users';

export interface TokenUser {
  firstname: string;
  lastname: string;
  email: string;
}
const createTokenUser = (user: User): TokenUser => {
  return {
    firstname: user.firstname,
    lastname: user.lastname,
    email: user.email,
  };
};

export { createTokenUser };
