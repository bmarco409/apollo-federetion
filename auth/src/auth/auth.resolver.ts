import { Inject, UseGuards } from '@nestjs/common';
import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { TokenDTO } from 'src/shared/dto/gql/token';
import { CreateUserDTO, UserDTO } from 'src/shared/dto/gql/user';
import { IAuthService } from 'src/shared/interface/auth-service.interface';
import {
  fromUserDomainToGQL,
  fromCreateUserGQLToDomain,
} from 'src/shared/mapper/user.mapper';
import { GqlAuthGuard } from './auth.guard';
import { CurrentUser } from './current-user.decorator';
import { IAuthFacade } from 'src/shared/interface/auth-facade.interface';

@Resolver(() => UserDTO)
export class AuthsResolver {
  constructor(
    @Inject('AUTH_FACADE')
    private facade: IAuthFacade,
  ) {}

  @Query(() => TokenDTO)
  async login(
    @Args('email') email: string,
    @Args('password') password: string,
  ): Promise<TokenDTO> {
    return this.facade.signIn(email, password);
  }

  @Mutation(() => UserDTO)
  @UseGuards(GqlAuthGuard)
  async createUser(
    @Args('user') user: CreateUserDTO,
    @CurrentUser() cuurentUser: UserDTO,
  ): Promise<UserDTO> {
    const createdUser = await this.facade.createuser(
      fromCreateUserGQLToDomain(user),
    );
    return fromUserDomainToGQL(createdUser);
  }
}
