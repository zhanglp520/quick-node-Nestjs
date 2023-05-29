import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import * as crypto from 'crypto-js';
import systemConfig from '../../config/system.config';
import { UserEntity } from '../system/user/entities/user.entity';
import { MenuEntity } from '../system/menu/entities/menu.entity';
import { RoleMenuEntity } from './entities/role-menu.entity';
import { UserRoleEntity } from './entities/user-role.entity';
import { UserService } from '../system/user/user.service';
import { CreateUserRoleDto } from './dtos/create-user-role.dto';
import { CreateRoleMenuDto } from './dtos/create-role-menu.dto';
/*
 *@Description: 权限管理模块业务
 *@Author: 土豆哥
 *@Date: 2022-11-28 23:25:58
 */
@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UserService,
    private readonly jwtService: JwtService
  ) {}

  @InjectRepository(MenuEntity)
  private readonly menuRepository: Repository<MenuEntity>;
  @InjectRepository(UserEntity)
  private readonly userRepository: Repository<UserEntity>;
  @InjectRepository(UserRoleEntity)
  private readonly userRoleRepository: Repository<UserRoleEntity>;
  @InjectRepository(RoleMenuEntity)
  private readonly roleMenuRepository: Repository<RoleMenuEntity>;

  async validateUserById(id: number) {
    const user = await this.userService.getUserById(id);
    if (!user) {
      return null;
    }
    return user;
  }

  async validateUserByUserName(
    username: string,
    pass: string
  ): Promise<UserEntity> {
    const user = await this.userService.getUserByUserName(username);
    if (!user) {
      throw new HttpException(
        {
          message: '登录失败,暂无此用户.',
        },
        HttpStatus.BAD_REQUEST
      );
    } else if (user.password !== crypto.MD5(pass).toString()) {
      throw new HttpException(
        {
          message: '登录失败,用户名或者密码错误.',
        },
        HttpStatus.BAD_REQUEST
      );
    } else if (!user.enabled) {
      throw new HttpException(
        {
          message: '登录失败,用户被禁用.',
        },
        HttpStatus.BAD_REQUEST
      );
    }
    return user;
  }
  genToken(payload) {
    const { accessTokenExpiresIn, refreshTokenExpiresIn } = systemConfig;
    const quickAccessToken = this.jwtService.sign(payload, {
      expiresIn: accessTokenExpiresIn,
    });
    const quickRefreshToken = this.jwtService.sign(payload, {
      expiresIn: refreshTokenExpiresIn,
    });
    const { exp } = this.jwtService.verify(quickAccessToken); //获取jwt生成的到期时间
    // const expiresIn = new Date().getTime() + 1000 * accessTokenExpiresIn;//有误差，不严重
    const data = {
      quickAccessToken,
      quickRefreshToken,
      expiresIn: exp,
    };
    return data;
  }
  async refreshToken(token: string) {
    try {
      const payload = await this.verifyToken(token);
      const { id, userName } = payload;
      if (!id) {
        throw new HttpException(
          {
            message: '当前登录已过期，请重新登录',
          },
          HttpStatus.UNAUTHORIZED
        );
      }
      const tokenObj = this.genToken({ id, userName });
      const { quickAccessToken, quickRefreshToken, expiresIn } = tokenObj;
      return {
        quickAccessToken,
        quickRefreshToken,
        expiresIn,
      };
    } catch (error) {
      throw new HttpException(
        {
          message: '当前登录已过期，请重新登录',
        },
        HttpStatus.UNAUTHORIZED
      );
    }
  }
  async verifyToken(token: string) {
    try {
      const payload = this.jwtService.verify(token);
      return payload;
    } catch (error) {
      throw error;
    }
  }
  async validateUserByJwt(payload): Promise<UserEntity> {
    const { id } = payload;
    return await this.userService.getUserById(id);
  }
  async login(user: any) {
    const userEntity = await this.validateUserByUserName(
      user.username,
      user.password
    );
    if (!userEntity) {
      return null;
    }
    const { userName, id } = userEntity;
    const payload = { userName, id };
    const tokenObj = this.genToken(payload);
    const { quickAccessToken, quickRefreshToken, expiresIn } = tokenObj;
    return {
      quickAccessToken,
      quickRefreshToken,
      expiresIn,
    };
  }

  async logout() {
    return null;
  }

  async getMenuByUserId(id: number) {
    const listNew = [];
    const listAll = await this.menuRepository.find();
    if (id == 0) {
      return listAll;
    }
    const qb = this.menuRepository
      .createQueryBuilder('m')
      .innerJoinAndSelect('per_role_menus', 'rm', 'rm.menu_id = m.id')
      .innerJoinAndSelect('sys_roles', 'r', 'r.id = rm.role_id')
      .innerJoinAndSelect('per_user_roles', 'ur', 'ur.role_id = r.id')
      .innerJoinAndSelect('sys_users', 'u', 'u.id=ur.user_id')
      .where('u.id = :id', { id: id });
    const list = await qb.getMany();
    list.forEach((item) => {
      if (item.pId !== 0) {
        const menu = listAll.find((x) => x.id === item.pId);
        if (menu) {
          if (menu.pId !== 0) {
            const menu1 = listAll.find((x) => x.id === menu.pId);
            if (menu1) {
              const index1 = listNew.findIndex((x) => x.id === menu1.id);
              if (index1 === -1) {
                listNew.push(menu1);
              }
            }
          }
          const index2 = listNew.findIndex((x) => x.id === menu.id);
          if (index2 === -1) {
            listNew.push(menu);
          }
        }
        const index3 = listNew.findIndex((x) => x.id === item.id);
        if (index3 === -1) {
          listNew.push(item);
        }
      }
    });
    return listNew;
  }
  async getUserListByRoleId(id: number) {
    const qb = this.userRepository
      .createQueryBuilder('u')
      .innerJoinAndSelect('per_user_roles', 'ur', 'ur.user_id = u.id')
      .where('ur.role_id = :id', { id: id })
      .select(['u.id']);
    const list = await qb.getMany();
    const ids = list.map((x) => x.id);
    return ids;
  }
  async getMenuListByRoleId(id: number) {
    const qb = this.menuRepository
      .createQueryBuilder('m')
      .innerJoinAndSelect('per_role_menus', 'rm', 'rm.menu_id = m.id')
      .where('rm.role_id = :id', { id: id })
      .select(['m.id']);
    const list = await qb.getMany();
    const ids = list.map((x) => x.id);
    return ids;
  }
  async assignUser(createUserRoleDto: CreateUserRoleDto) {
    const { roleId } = createUserRoleDto;
    const list = new Array<UserRoleEntity>();
    const ids = createUserRoleDto.userIds.split(',');
    ids.forEach(async (element) => {
      const userRoleEntity = new UserRoleEntity();
      userRoleEntity.roleId = roleId;
      userRoleEntity.userId = Number(element);
      list.push(userRoleEntity);
    });
    await this.userRoleRepository.delete({
      roleId,
    });
    await this.userRoleRepository.insert(list);
  }
  async assignPermission(createRoleMenuDto: CreateRoleMenuDto) {
    const { roleId } = createRoleMenuDto;
    const list = new Array<RoleMenuEntity>();
    const ids = createRoleMenuDto.menuIds.split(',');
    ids.forEach((element) => {
      const roleMenuEntity = new RoleMenuEntity();
      roleMenuEntity.roleId = roleId;
      roleMenuEntity.menuId = Number(element);
      list.push(roleMenuEntity);
    });
    await this.roleMenuRepository.delete({
      roleId,
    });
    await this.roleMenuRepository.insert(list);
  }
}
