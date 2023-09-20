import { Module } from "@nestjs/common";
import { PassportModule } from "@nestjs/passport";
import { JwtModule } from "@nestjs/jwt";
import { TypeOrmModule } from "@nestjs/typeorm";
import { MenuEntity } from "@/modules/system/menu/entities/menu.entity";
import { UserEntity } from "@/modules/system/user/entities/user.entity";
import { UserModule } from "@/modules/system/user/user.module";
import { jwtConstants } from "@/modules/auth/constants";
import { LocalStrategy } from "@/modules/auth/strategies/local.strategy";
import { JwtStrategy } from "@/modules/auth/strategies/jwt.strategy";
import { UserRoleEntity } from "@/modules/auth/entities/user-role.entity";
import { RoleMenuEntity } from "@/modules/auth/entities/role-menu.entity";
import { AuthService } from "@/modules/auth/auth.service";
import { AuthController } from "@/modules/auth/auth.controller";
import { ApiEntity } from "@/modules/system/api/entities/api.entity";
import { RoleApiEntity } from "@/modules/auth/entities/role-api.entity";

@Module({
  imports: [
    TypeOrmModule.forFeature([
      MenuEntity,
      UserEntity,
      UserRoleEntity,
      RoleMenuEntity,
      ApiEntity,
      RoleApiEntity,
    ]),
    PassportModule,
    //PassportModule.register({
    // defaultStrategy: 'jwt',
    // session: true,
    //}),
    JwtModule.register({
      secret: jwtConstants.secret,
      // signOptions: { expiresIn: 60 * 10 },
    }),
    UserModule,
  ],
  controllers: [AuthController],
  providers: [AuthService, LocalStrategy, JwtStrategy],
  exports: [AuthService],
})
export class AuthModule {}
