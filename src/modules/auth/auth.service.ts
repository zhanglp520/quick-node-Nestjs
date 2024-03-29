import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import * as crypto from "crypto-js";
import systemConfig from "@/config/system.config";
import { MenuEntity } from "@/modules/system/menu/entities/menu.entity";
import { ApiEntity } from "@/modules/system/api/entities/api.entity";
import { UserEntity } from "@/modules/system/user/entities/user.entity";
import { UserService } from "@/modules/system/user/user.service";
import { RoleMenuEntity } from "@/modules/auth/entities/role-menu.entity";
import { UserRoleEntity } from "@/modules/auth/entities/user-role.entity";
import { CreateUserRoleDto } from "@/modules/auth/dtos/create-user-role.dto";
import { CreateRoleAuthDto } from "@/modules/auth/dtos/create-role-auth.dto";
import { LoginDto } from "@/modules/auth/dtos/login.dto";
import { RefreshTokenDto } from "@/modules/auth/dtos/refresh-token.dto";
import { Token } from "@/common/tools/token";
import { RoleApiEntity } from "./entities/role-api.entity";

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UserService,
    private readonly jwtService: JwtService
  ) {}

  @InjectRepository(UserEntity)
  private readonly userRepository: Repository<UserEntity>;
  @InjectRepository(MenuEntity)
  private readonly menuRepository: Repository<MenuEntity>;
  @InjectRepository(ApiEntity)
  private readonly apiRepository: Repository<ApiEntity>;

  @InjectRepository(UserRoleEntity)
  private readonly userRoleRepository: Repository<UserRoleEntity>;
  @InjectRepository(RoleMenuEntity)
  private readonly roleMenuRepository: Repository<RoleMenuEntity>;
  @InjectRepository(RoleApiEntity)
  private readonly roleApiRepository: Repository<RoleApiEntity>;

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
          message: "登录失败,暂无此用户.",
        },
        HttpStatus.BAD_REQUEST
      );
    } else if (user.password !== crypto.MD5(pass).toString()) {
      throw new HttpException(
        {
          message: "登录失败,用户名或者密码错误.",
        },
        HttpStatus.BAD_REQUEST
      );
    } else if (!user.enabled) {
      throw new HttpException(
        {
          message: "登录失败,用户被禁用.",
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
    const tokenVo = new Token();
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
            message: "当前登录已过期，请重新登录",
          },
          HttpStatus.UNAUTHORIZED
        );
      }
      const tokenObj = this.genToken({ id, userName });
      const { quickAccessToken, quickRefreshToken, expiresIn } = tokenObj;
      const token = new Token();
      token.quickAccessToken = quickAccessToken;
      token.quickRefreshToken = quickRefreshToken;
      token.expiresIn = expiresIn;
      return token;
    } catch (error) {
      throw new HttpException(
        {
          message: "当前登录已过期，请重新登录",
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
    const result = await this.userService.getUserById(id);
    return result;
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
    const token = new Token();
    token.quickAccessToken = quickAccessToken;
    token.quickRefreshToken = quickRefreshToken;
    token.expiresIn = expiresIn;
    return token;
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
      .createQueryBuilder("m")
      .innerJoinAndSelect("per_role_menus", "rm", "rm.menu_id = m.id")
      .innerJoinAndSelect("sys_roles", "r", "r.id = rm.role_id")
      .innerJoinAndSelect("per_user_roles", "ur", "ur.role_id = r.id")
      .innerJoinAndSelect("sys_users", "u", "u.id=ur.user_id")
      .where("u.id = :id", { id: id });
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
      .createQueryBuilder("u")
      .innerJoinAndSelect("per_user_roles", "ur", "ur.user_id = u.id")
      .where("ur.role_id = :id", { id: id })
      .select(["u.id"]);
    const list = await qb.getMany();
    const ids = list.map((x) => x.id);
    return ids;
  }

  async getMenuListByRoleId(id: number) {
    const qb = this.menuRepository
      .createQueryBuilder("m")
      .innerJoinAndSelect("per_role_menus", "rm", "rm.menu_id = m.id")
      .where("rm.role_id = :id", { id: id })
      .select(["m.id"]);
    const list = await qb.getMany();
    const ids = list.map((x) => x.id);
    return ids;
  }
  async assignUser(createUserRoleDto: CreateUserRoleDto) {
    const { roleId } = createUserRoleDto;
    const list = new Array<UserRoleEntity>();
    const ids = createUserRoleDto.userIds.split(",");
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

  async assignPermission(createRoleAuthDto: CreateRoleAuthDto) {
    const { roleId, menuIds, apiIds } = createRoleAuthDto;
    await this.roleMenuRepository.delete({
      roleId,
    });

    //角色授权菜单
    const roleMenuList = new Array<RoleMenuEntity>();
    const mIds = menuIds.split(",");
    mIds.forEach((element) => {
      const roleMenuEntity = new RoleMenuEntity();
      roleMenuEntity.roleId = roleId;
      roleMenuEntity.menuId = Number(element);
      roleMenuList.push(roleMenuEntity);
    });
    await this.roleMenuRepository.insert(roleMenuList);

    //角色授权接口
    const roleApiList = new Array<RoleApiEntity>();
    const aIds = apiIds.split(",");
    aIds.forEach((element) => {
      const roleApiEntity = new RoleApiEntity();
      roleApiEntity.roleId = roleId;
      roleApiEntity.apiId = Number(element);
      roleApiList.push(roleApiEntity);
    });
    await this.roleApiRepository.insert(roleApiList);
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
      .createQueryBuilder("a")
      .leftJoinAndSelect("per_role_apis", "ra", "ra.api_id = a.id")
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
      .createQueryBuilder("a")
      .leftJoinAndSelect("per_role_apis", "ra", "ra.api_id = a.id")
      .andWhere(`ra.role_id=:id`, { id: id });
    const list = await qb.getMany();
    const ids = list.map((x) => x.id);
    return ids;
  }
}
