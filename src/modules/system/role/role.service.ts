import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { toEntity } from "src/utils/dto2Entity";
import { Repository } from "typeorm";
import { CreateRoleDto } from "./dto/create-role.dto";
import { SearchRoleDto } from "./dto/search-role.dto";
import { UpdateRoleDto } from "./dto/update-role.dto";
import { RoleEntity } from "./entities/role.entity";
import { PageResponseResult } from "@/common/tools/page.response.result";

@Injectable()
export class RoleService {
  @InjectRepository(RoleEntity)
  private readonly roleRepository: Repository<RoleEntity>;

  /**
   * 获取角色分页列表
   * @param searchRoleDto 搜索dto
   */
  async getRolePageList(searchRoleDto: SearchRoleDto) {
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
    const result = new PageResponseResult<RoleEntity[]>(page.total, entities);
    return result;
  }

  /**
   * 获取角色列表
   */
  async getRoleList() {
    const entities = await this.roleRepository.find();
    return entities;
  }

  /**
   * 根据用户id获取用户信息
   * @param id 主键
   */
  async getRoleById(id: number) {
    const entity = await this.roleRepository.findOne({
      where: {
        id,
      },
    });
    return entity;
  }

  /**
   * 根据用户名称获取用户信息
   * @param userName 用户名称
   */
  async getRoleByRoleName(roleName: string) {
    const entity = await this.roleRepository.findOneBy({
      roleName,
    });
    return entity;
  }

  /**
   * 创建角色
   * @param createUserDto 创建角色dto
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
   */
  async updateRoleById(id: number, updateRoleDto: UpdateRoleDto) {
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
  }

  /**
   * 删除角色
   * @param id 主键
   */
  async removeRoleById(id: number) {
    await this.roleRepository.delete(id);
  }
}
