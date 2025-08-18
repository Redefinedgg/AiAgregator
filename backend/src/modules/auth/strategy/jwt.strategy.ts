// src/auth/jwt.strategy.ts
import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor() {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(), // токен из заголовка Authorization: Bearer TOKEN
      ignoreExpiration: false,
      secretOrKey: process.env.JWT_SECRET, // вынеси в .env
    });
  }

  async validate(payload: any) {
    return { uuid: payload.uuid };
  }
}
