import { Inject, Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Token } from 'src/shared/domain/token';
import { User } from 'src/shared/domain/user';
import { IAuthService } from 'src/shared/interface/auth-service.interface';
import { IRepository } from 'src/shared/interface/repository.interface';
import * as bcrypt from 'bcrypt';

const saltOrRounds = 10;

@Injectable()
export class AuthService implements IAuthService {
  constructor(
    @Inject('USER_REPOSITORY')
    private repository: IRepository<User>,
    private jwtService: JwtService,
  ) {}
  verifyToken(token: string): Promise<User> {
    throw new Error('Method not implemented.');
  }

  async signIn(email: string, password: string): Promise<Token> {
    const user = await this.repository.findOne(email);
    const hash = await bcrypt.hash(password, saltOrRounds);
    const isMatch = await bcrypt.compare(password, hash);
    if (!isMatch) {
      throw new UnauthorizedException();
    }
    const payload = { sub: user.id, email: user.email };
    return {
      accessToken: await this.jwtService.signAsync(payload),
      refreshToken: await this.jwtService.signAsync(payload, {
        expiresIn: '7d',
      }),
    };
  }
  createuser(user: User): Promise<User> {
    return this.repository.create(user);
  }
}
