import { Token } from '../domain/token';
import { User } from '../domain/user';

export interface IAuthService {
  signIn(email: string, password: string): Promise<Token>;
  createuser(user: User): Promise<User>;
  verifyToken(token: string): Promise<User>;
}
