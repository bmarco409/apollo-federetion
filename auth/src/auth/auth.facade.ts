import { Inject, Injectable } from '@nestjs/common';
import { Token } from 'src/shared/domain/token';
import { User } from 'src/shared/domain/user';
import { IAuthFacade } from 'src/shared/interface/auth-facade.interface';
import { IAuthService } from 'src/shared/interface/auth-service.interface';
import { IService } from 'src/shared/interface/service.interface';
import { IUserService } from 'src/shared/interface/user.service.interface';

@Injectable()
export class AuthFacade implements IAuthFacade {
  constructor(
    @Inject('AUTH_SERVICE') private authService: IAuthService,
    @Inject('USER_SERVICE') private userService: IUserService,
  ) {}
  async signIn(email: string, password: string): Promise<Token> {
    const token = await this.authService.signIn(email, password);
    const user = await this.userService.updateRefreshToken(
      email,
      token.refreshToken,
    );
    return token;
  }
  createuser(user: User): Promise<User> {
    return this.authService.createuser(user);
  }
  verifyToken(token: string): Promise<User> {
    return this.authService.verifyToken(token);
  }
}
