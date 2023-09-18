import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { toEntity } from "src/utils/dto2Entity";
import { Repository } from "typeorm";
import { CreateRoleDto } from "./dto/create-role.dto";
import { SearchRoleDto } from "./dto/search-role.dto";
import { UpdateRoleDto } from "./dto/update-role.dto";
import { RoleEntity } from "./entities/role.entity";
import { PageResponseResult } from "@/common/tools/page.response.result";
import { ResponseStatus } from "@/common/enums/response-status.enum";
import { ResponseResult } from "@/common/tools/response.result";

@Injectable()
export class RoleService {
  @InjectRepository(RoleEntity)
  private readonly roleRepository: Repository<RoleEntity>;

  /**
   * 获取角色分页列表
   * @param searchRoleDto 搜索dto
   * @returns Promise<PageResponseResult<RoleEntity[]>>
   */
  async getRolePageList(
    searchRoleDto: SearchRoleDto
  ): Promise<PageResponseResult<RoleEntity[]>> {
    const { page, keyword } = searchRoleDto;
    const { current, size } = page;
    const skip = (current - 1) * size;
    const queryBuilder = this.roleRepository.createQueryBuilder();
    if (keyword) {
      queryBuilder.where(`role_name=:roleName`, { roleName: keyword });
      queryBuilder.orWhere(`phone=:phone`, { phone: keyword });
    }
    const entities = await queryBuilder
      .orderBy("create_time", "DESC")
      .offset(skip)
      .limit(size)
      .getMany();
    page.total = await queryBuilder.getCount();
    const result = new PageResponseResult<RoleEntity[]>(
      ResponseStatus.success,
      "操作成功",
      page.total,
      entities
    );
    return result;
  }

  /**
   * 获取角色列表
   * @returns Promise<ResponseResult<RoleEntity[]>>
   */
  async getRoleList(): Promise<ResponseResult<RoleEntity[]>> {
    const entities = await this.roleRepository.find();
    const result = new ResponseResult<RoleEntity[]>(
      ResponseStatus.success,
      "操作成功",
      entities
    );
    return result;
  }

  /**
   * 根据用户id获取用户信息
   * @param id 主键
   * @returns
   */
  async getRoleById(id: number) {
    const entity = await this.roleRepository.findOne({
      where: {
        id,
      },
    });
    const result = new ResponseResult<RoleEntity>(
      ResponseStatus.success,
      "操作成功",
      entity
    );
    return result;
  }

  /**
   * 根据用户名称获取用户信息
   * @param userName 用户名称
   * @returns  Promise<ResponseResult<UserEntity>>
   */
  async getRoleByRoleName(
    roleName: string
  ): Promise<ResponseResult<RoleEntity>> {
    const entity = await this.roleRepository.findOneBy({
      roleName,
    });
    const result = new ResponseResult<RoleEntity>(
      ResponseStatus.success,
      "操作成功",
      entity
    );
    return result;
  }

  /**
   * 创建角色
   * @param createUserDto 创建角色dto
   * @returns  Promise<ResponseResult>
   */
  async createRole(createRoleDto: CreateRoleDto) {
    const role = await this.roleRepository.findOneBy({
      roleName: createRoleDto.roleName,
    });
    if (role) {
      throw new HttpException("操作失败,角色名已使用.", HttpStatus.BAD_REQUEST);
    }
    const roleEntity = new RoleEntity();
    toEntity(createRoleDto, roleEntity);
    await this.roleRepository.insert(roleEntity);
  }

  /**
   * 修改角色
   * @param id 主键
   * @param updateUserDto 修改角色dto
   * @returns Promise<ResponseResult>
   */
  async updateRoleById(
    id: number,
    updateRoleDto: UpdateRoleDto
  ): Promise<ResponseResult> {
    const role = await this.getRoleById(id);
    if (!role) {
      throw new HttpException(
        "操作失败,未找到角色信息.",
        HttpStatus.BAD_REQUEST
      );
    }
    const roleEntity = new RoleEntity();
    toEntity(updateRoleDto, roleEntity);
    await this.roleRepository.update(id, roleEntity);
    const result = new ResponseResult<RoleEntity>(
      ResponseStatus.success,
      "操作成功"
    );
    return result;
  }

  /**
   * 删除角色
   * @param id 主键
   * @returns  Promise<ResponseResult>
   */
  async removeRoleById(id: number): Promise<ResponseResult> {
    await this.roleRepository.delete(id);
    const result = new ResponseResult<RoleEntity>(
      ResponseStatus.success,
      "操作成功"
    );
    return result;
  }
}
