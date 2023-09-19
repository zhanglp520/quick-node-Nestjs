import {
  ExecutionContext,
  HttpException,
  HttpStatus,
  Injectable,
} from "@nestjs/common";
import { AuthGuard } from "@nestjs/passport";
import { Reflector } from "@nestjs/core";
import { AuthService } from "@/modules/auth/auth.service";

@Injectable()
export class JwtAuthGuard extends AuthGuard("jwt") {
  constructor(
    private reflector: Reflector,
    private readonly authService: AuthService
  ) {
    super();
  }
  async canActivate(context: ExecutionContext) {
    const isPublic = this.reflector.getAllAndOverride("isPublic", [
      context.getHandler(),
      context.getClass(),
    ]);
    if (isPublic) return true;
    try {
      //校验token是否过期
      await this.checkToken(context);
      return this.activate(context);
    } catch (error) {
      throw error;
    }
  }
  async activate(context: ExecutionContext): Promise<boolean> {
    return super.canActivate(context) as Promise<boolean>;
  }

  async checkToken(context: ExecutionContext) {
    const req = context.switchToHttp().getRequest();
    const accessToken = req.get("Authorization");
    if (!accessToken) {
      throw new HttpException("请先登录", HttpStatus.UNAUTHORIZED);
    }
    if (accessToken.indexOf("Bearer") === -1) {
      throw new HttpException("token未包含Bearer头", HttpStatus.UNAUTHORIZED);
    }
    try {
      const tokenStr = accessToken.replace("Bearer ", "");
      const payload = await this.authService.verifyToken(tokenStr);
      const { userName } = payload;
      if (!userName) {
        throw new HttpException(
          "当前登录已过期,请重新登录.",
          HttpStatus.UNAUTHORIZED
        );
      }
    } catch (error) {
      throw new HttpException(
        "当前登录已过期,请重新登录.",
        HttpStatus.UNAUTHORIZED
      );
    }
  }
}
