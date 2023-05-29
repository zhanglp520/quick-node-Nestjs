import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { toEntity } from 'src/utils/dto2Entity';
import { Repository } from 'typeorm';
import { CreateRoleDto } from './dto/create-role.dto';
import { SearchRoleDto } from './dto/search-role.dto';
import { UpdateRoleDto } from './dto/update-role.dto';
import { RoleEntity } from './entities/role.entity';

@Injectable()
export class RoleService {
  @InjectRepository(RoleEntity)
  private readonly roleRepository: Repository<RoleEntity>;

  async getRolePageList(searchRoleDto: SearchRoleDto) {
    const { page, keyword } = searchRoleDto;
    const { current, size } = page;
    const skip = (current - 1) * size;
    const queryBuilder = this.roleRepository.createQueryBuilder();
    if (keyword) {
      queryBuilder.where(`role_name=:roleName`, { roleName: keyword });
      queryBuilder.orWhere(`phone=:phone`, { phone: keyword });
    }
    const list = await queryBuilder
      .orderBy('create_time', 'DESC')
      .offset(skip)
      .limit(size)
      .getMany();
    page.total = await this.roleRepository.count();
    return {
      payload: list,
      total: page.total,
    };
  }

  getRoleList() {
    return this.roleRepository.find();
  }

  getRoleById(id: number) {
    return this.roleRepository.findOne({
      where: {
        id,
      },
    });
  }

  getRoleByRoleName(roleName: string) {
    return this.roleRepository.findOneBy({
      roleName,
    });
  }

  async createRole(createRoleDto: CreateRoleDto) {
    const role = await this.roleRepository.findOneBy({
      roleName: createRoleDto.roleName,
    });
    if (role) {
      throw new HttpException('操作失败,角色名已使用.', HttpStatus.BAD_REQUEST);
    }
    const roleEntity = new RoleEntity();
    toEntity(createRoleDto, roleEntity);
    await this.roleRepository.insert(roleEntity);
  }

  async updateRoleById(id: number, updateRoleDto: UpdateRoleDto) {
    const role = await this.getRoleById(id);
    if (!role) {
      throw new HttpException(
        '操作失败,未找到角色信息.',
        HttpStatus.BAD_REQUEST
      );
    }
    const roleEntity = new RoleEntity();
    toEntity(updateRoleDto, roleEntity);
    await this.roleRepository.update(id, roleEntity);
  }

  async removeRoleById(id: number) {
    await this.roleRepository.delete(id);
  }
}
