import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy, ExtractJwt } from 'passport-jwt';
import { JWTPayload } from 'src/shared/domain/jwt-payload';
import { Token } from 'src/shared/domain/token';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor() {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: 'secret_segretissima',
    });
  }

  validate(payload: JWTPayload): JWTPayload {
    return payload;
  }
}
