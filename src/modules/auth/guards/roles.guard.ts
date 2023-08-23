import {
  Injectable,
  CanActivate,
  ExecutionContext,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { ROLES_KEY } from '@/common/decorators/roles.decorator';
import { Role } from '@/common/enums/role.enum';
import { AuthService } from '@/modules/auth/auth.service';

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(
    private readonly reflector: Reflector,
    private readonly authService: AuthService
  ) {}
  async canActivate(context: ExecutionContext) {
    const requiredRoles = this.reflector.getAllAndOverride<Role[]>(ROLES_KEY, [
      context.getHandler(),
      context.getClass(),
    ]);
    if (!requiredRoles) {
      return true;
    }
    const { user, url } = context.switchToHttp().getRequest();
    const roleCodes = user.roles?.map((item: any) => item.id);
    const flag = requiredRoles.some((role) => roleCodes?.includes(role));
    if (flag) {
      return true;
    }
    const isCustom = requiredRoles.includes(Role.custom);
    if (isCustom) {
      const apis = await this.authService.getApiListByRoleId1(requiredRoles[0]);
      if (apis && apis.length > 0) {
        const arr = apis.filter((x) => x.apiPath == url);
        if (arr && arr.length > 0) {
          return true;
        }
      }
    }
    throw new HttpException(
      {
        message: '无权限访问此接口',
      },
      HttpStatus.UNAUTHORIZED
    );
  }
}
