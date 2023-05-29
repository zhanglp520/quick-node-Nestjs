import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { AuthService } from '../auth.service';
import { jwtConstants } from '../constants';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(private readonly authService: AuthService) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: jwtConstants.secret,
    });
  }
  async validate(payload: any) {
    const { id } = payload;
    const user = await this.authService.validateUserByJwt(id);
    if (!user) {
      throw new HttpException(
        {
          message: '当前登录已过期,请重新登录.',
        },
        HttpStatus.UNAUTHORIZED
      );
    }
    return user;
  }
}
