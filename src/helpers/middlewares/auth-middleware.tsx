import { NextFunction, Response } from 'express';
import jwt from 'jsonwebtoken';
import AuthenticationTokenMissingException from '../exceptions/AuthenticationTokenMissingException';
import WrongAuthenticationTokenException from '../exceptions/WrongAuthenticationTokenException';
import RequestWithUser from '../interfaces/requestWithUser.inteface';
import { DataStoredInToken } from '../../token/token.interface';
import usersMock from '../mocks/users.mock';

export default async (request: RequestWithUser, response: Response, next: NextFunction) => {
  const cookies = request.cookies;
  if (cookies && cookies.Authorization) {
    const secret:string = process.env.JWT_SECRET || 'Lucas';
    try {
      const verificationResponse:DataStoredInToken = jwt.verify(cookies.Authorization, secret) as DataStoredInToken;
      const id = verificationResponse.id;
      const user = await usersMock.find(user => user.id === id);
      if (user) {
        request.user = user;
        next();
      } else {
        next(new WrongAuthenticationTokenException());
      }
    } catch (error) {
      next(new WrongAuthenticationTokenException());
    }
  } else {
    next(new AuthenticationTokenMissingException());
  }
}