import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { AuthService } from '@/modules/auth/auth.service';
import { jwtConstants } from '@/modules/auth/constants';

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
    const user = await this.authService.validateUserByJwt(payload);
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
