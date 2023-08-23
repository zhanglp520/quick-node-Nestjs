import { HttpException, HttpStatus, Inject, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import * as crypto from 'crypto-js';
import iot, {
  IConnectResult,
  IMessageResult,
  IOTConfig,
} from '@ainiteam/quick-iot-device-sdk';
import systemConfig from '@/config/system.config';
import { MenuEntity } from '@/modules/system/menu/entities/menu.entity';
import { ApiEntity } from '@/modules/system/api/entities/api.entity';
import { UserEntity } from '@/modules/system/user/entities/user.entity';
import { UserService } from '@/modules/system/user/user.service';
import { UserVo } from '@/modules/system/user/vo/user.vo';
import { RoleMenuEntity } from '@/modules/auth/entities/role-menu.entity';
import { UserRoleEntity } from '@/modules/auth/entities/user-role.entity';
import { CreateUserRoleDto } from '@/modules/auth/dtos/create-user-role.dto';
import { CreateRoleMenuDto } from '@/modules/auth/dtos/create-role-menu.dto';
import { LoginDto } from '@/modules/auth/dtos/login.dto';
import { RefreshTokenDto } from '@/modules/auth/dtos/refresh-token.dto';
import { TokenVo } from '@/modules/auth/vo/token.vo';
import { SimulatorService } from '../device/simulator/simulator.service';

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UserService,
    private readonly jwtService: JwtService,
    // @Inject(SimulatorService)
    // private readonly simulatorService: SimulatorService
  ) {}

  private device = null;
  private config = null;
  private status = false;

  @InjectRepository(MenuEntity)
  private readonly menuRepository: Repository<MenuEntity>;
  @InjectRepository(UserEntity)
  private readonly userRepository: Repository<UserEntity>;
  @InjectRepository(UserRoleEntity)
  private readonly userRoleRepository: Repository<UserRoleEntity>;
  @InjectRepository(RoleMenuEntity)
  private readonly roleMenuRepository: Repository<RoleMenuEntity>;
  @InjectRepository(ApiEntity)
  private readonly apiRepository: Repository<ApiEntity>;
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
  ): Promise<UserVo> {
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
    const config: IOTConfig = {
      productKey: 'k00wmvASb4P',
      deviceName: '1000-00111',
      clientOptions: {
        host: '43.139.141.111',
        port: 1883,
        protocol: 'mqtt',
        clientId: 'quick_iot_server',
        // clientId:
        //   'quick_iot_server_' + Math.random().toString(16).substring(2, 8),
        username: 'quick',
        password: 'quick',
      },
    };
    this.config = config;
    this.device = iot.createDeviceInstance(config);
    this.device.online();
    this.device.on('connect', (res: IConnectResult) => {
      console.log('connect success.', res);
      this.status = true;
    });

    this.device.on(
      'message',
      (topic: string, payload: Buffer, res: IMessageResult) => {
        console.log('message:', {
          topic,
          payload: payload.toString(),
          // res,
        });
        const { id, version, method, params } = JSON.parse(payload.toString());
        const productId = 1;
        const deviceId = 11;
        // this.simulatorService.reportAttribute(productId, deviceId, params);
      }
    );
    // setTimeout(() => {
    //   this.device.postProps(
    //     {
    //       CurrentHumidity: Math.random().toString(16).substring(2, 4),
    //       CurrentTemperature: Math.random().toString(16).substring(2, 4),
    //     },
    //     (packet?: any) => {
    //       console.log('postProps', packet);
    //     }
    //   );
    // }, 1000 * 3);
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
    const tokenVo = new TokenVo();
    tokenVo.quickAccessToken = quickAccessToken;
    tokenVo.quickRefreshToken = quickRefreshToken;
    tokenVo.expiresIn = exp;
    return tokenVo;
  }

  async refreshToken(refreshTokenDto: RefreshTokenDto) {
    try {
      const payload = await this.verifyToken(refreshTokenDto.quickRefreshToken);
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
      const tokenVo = new TokenVo();
      tokenVo.quickAccessToken = quickAccessToken;
      tokenVo.quickRefreshToken = quickRefreshToken;
      tokenVo.expiresIn = expiresIn;
      return tokenVo;
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

  async validateUserByJwt(payload): Promise<UserVo> {
    const { id } = payload;
    return await this.userService.getUserById(id);
  }

  async login(login: LoginDto) {
    const userEntity = await this.validateUserByUserName(
      login.username,
      login.password
    );
    if (!userEntity) {
      return null;
    }
    const { userName, id } = userEntity;
    const payload = { userName, id };
    const tokenObj = this.genToken(payload);
    const { quickAccessToken, quickRefreshToken, expiresIn } = tokenObj;
    const tokenVo = new TokenVo();
    tokenVo.quickAccessToken = quickAccessToken;
    tokenVo.quickRefreshToken = quickRefreshToken;
    tokenVo.expiresIn = expiresIn;
    return tokenVo;
  }

  async logout() {
    return null;
  }

  async getMenuByUserId(id: number) {
    const listNew = new Array<MenuEntity>();
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
    list.forEach((item: MenuEntity) => {
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
  async getApiListByRoleId1(id: number) {
    // const sql = this.apiRepository
    //   .createQueryBuilder('a')
    //   .leftJoinAndSelect('per_role_apis', 'ra', 'ra.api_id = a.id')
    //   .andWhere(`ra.role_id=:id`, { id: id })
    //   .getSql();
    // console.log('sql', sql);
    // return;
    const qb = this.apiRepository
      .createQueryBuilder('a')
      .leftJoinAndSelect('per_role_apis', 'ra', 'ra.api_id = a.id')
      .andWhere(`ra.role_id=:id`, { id: id });
    const list = await qb.getMany();
    return list;
  }
  async getApiListByRoleId(id: number) {
    // const sql = this.apiRepository
    //   .createQueryBuilder('a')
    //   .leftJoinAndSelect('per_role_apis', 'ra', 'ra.api_id = a.id')
    //   .andWhere(`ra.role_id=:id`, { id: id })
    //   .getSql();
    // console.log('sql', sql);
    // return;
    const qb = this.apiRepository
      .createQueryBuilder('a')
      .leftJoinAndSelect('per_role_apis', 'ra', 'ra.api_id = a.id')
      .andWhere(`ra.role_id=:id`, { id: id });
    const list = await qb.getMany();
    const ids = list.map((x) => x.id);
    return ids;
  }
}
