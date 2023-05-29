import { Module } from '@nestjs/common';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { jwtConstants } from './constants';
import { LocalStrategy } from './strategies/local.strategy';
import { JwtStrategy } from './strategies/jwt.strategy';
import { AuthService } from './auth.service';
import { UserModule } from '../system/user/user.module';
import { AuthController } from './auth.controller';
import { MenuEntity } from '../system/menu/entities/menu.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserEntity } from '../system/user/entities/user.entity';
import { UserRoleEntity } from './entities/user-role.entity';
import { RoleMenuEntity } from './entities/role-menu.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      MenuEntity,
      UserEntity,
      UserRoleEntity,
      RoleMenuEntity,
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
