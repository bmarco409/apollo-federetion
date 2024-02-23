import { Module } from '@nestjs/common';
import { UserRepository } from './user.repository';
import { AuthService } from './auth.service';
import { AuthsResolver } from './auth.resolver';
import { UserDao } from 'src/prisma/user.dao';
import { JwtModule, JwtService } from '@nestjs/jwt';
import { PrismaProvider } from 'src/prisma/prisma.provide';
import { AuthFacade } from './auth.facade';

@Module({
  imports: [],
  providers: [
    {
      provide: 'USER_REPOSITORY',
      useClass: UserRepository,
    },
    {
      provide: 'AUTH_SERVICE',
      useClass: AuthService,
    },
    {
      provide: 'AUTH_FACADE',
      useClass: AuthFacade,
    },
    AuthsResolver,
    UserDao,
    PrismaProvider,
  ],
})
export class AuthModule {}
