import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Not, Repository } from 'typeorm';
import * as ExcelJS from 'exceljs';
import { CreateUserDto } from './dto/create-user.dto';
import { SearchUserDto } from './dto/search-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { UserEntity } from './entities/user.entity';
import * as crypto from 'crypto-js';
import { toEntity } from 'src/utils/dto2Entity';
import systemConfig from '../../../config/system.config';
import { ChangePasswordDto } from './dto/change-password.dto';
import { InjectMapper } from '@automapper/nestjs';
import { Mapper } from '@automapper/core';
import { UserVo } from './vo/user.vo';
import { PageResponseResult } from 'src/common/tools/page.response.result';
import { UserRoleEntity } from '@/modules/auth/entities/user-role.entity';
import { UserRoleVo } from '@/modules/auth/vo/user-role.vo';
import { RoleEntity } from '../role/entities/role.entity';
import { RoleVo } from '../role/vo/role.vo';
/*
 *@Description: 用户管理模块业务
 *返回用户数据时，排除掉超级管理员,超级管理员id为0，默认管理员用户名为administrator。切记
 *@Author: 土豆哥
 *@Date: 2022-11-28 22:20:27
 */
@Injectable()
export class UserService {
  constructor(@InjectMapper() mapper: Mapper) {
    this.mapper = mapper;
  }

  private readonly mapper: Mapper;
  @InjectRepository(UserEntity)
  private readonly userRepository: Repository<UserEntity>;

  async getUserPageList(
    searchUserDto: SearchUserDto
  ): Promise<PageResponseResult<UserVo[]>> {
    const { page, keyword } = searchUserDto;
    const { current, size } = page;
    const skip = (current - 1) * size;
    const queryBuilder = this.userRepository.createQueryBuilder();
    queryBuilder.where('id<>0');
    if (keyword) {
      queryBuilder.andWhere(`user_name=:userName`, { userName: keyword });
      queryBuilder.orWhere(`phone=:phone`, { phone: keyword });
    }
    const entities = await queryBuilder
      .orderBy('create_time', 'DESC')
      .offset(skip)
      .limit(size)
      .getMany();

    const vos = await this.mapper.mapArrayAsync(entities, UserEntity, UserVo);
    page.total = await this.userRepository.count();
    const data = new PageResponseResult<UserVo[]>();
    data.payload = vos;
    data.total = page.total;
    return data;
  }

  async getUserList() {
    //多对一方式
    // console.log('entities', '多对一方式');
    const entities = await this.userRepository
      .createQueryBuilder('u')
      .leftJoinAndSelect('u.roles', 'system_roles')
      .getMany();
    //一对多方式
    // const entities = await this.userRepository
    //   .createQueryBuilder('u')
    //   .leftJoinAndSelect('u.userRoles', 'per_user_roles')
    //   .getMany();
    //关联时，使用此方式，得不到关联属性值
    // const entities = await this.userRepository.find({
    //   where: {
    //     id: Not(0),
    //   },
    // });
    const vos = [];
    const self = this;
    entities.forEach((element) => {
      const vo = self.mapper.map(element, UserEntity, UserVo);
      const roleVos = self.mapper.mapArray(element.roles, RoleEntity, RoleVo);
      vo.roles = roleVos;
      vos.push(vo);
    });
    return vos;
  }

  async getUserById(id: number) {
    const entity = await this.userRepository
      .createQueryBuilder('u')
      .leftJoinAndSelect('u.roles', 'system_roles')
      .andWhere(`u.id=:id`, { id: id })
      .getOne();
    const roleVos = await this.mapper.mapArrayAsync(
      entity.roles,
      RoleEntity,
      RoleVo
    );
    const vo = await this.mapper.mapAsync(entity, UserEntity, UserVo);
    vo.roles = roleVos;
    return vo;
    // const entity = await this.getById(id);
    // const vo = await this.mapper.mapAsync(entity, UserEntity, UserVo);
    // // const roleVos = await this.mapper.mapArrayAsync(
    // //   entity.roles,
    // //   RoleEntity,
    // //   RoleVo
    // // );
    // // vo.roles = roleVos;
    // return vo;
  }

  async getUserByUserName(userName: string) {
    // const entity = await this.userRepository.findOneBy({
    //   userName,
    // });

    const entity = await this.userRepository
      .createQueryBuilder('u')
      .leftJoinAndSelect('u.roles', 'system_roles')
      .andWhere(`user_name=:userName`, { userName: userName })
      .getOne();
    const roleVos = await this.mapper.mapArrayAsync(
      entity.roles,
      RoleEntity,
      RoleVo
    );
    const vo = await this.mapper.mapAsync(entity, UserEntity, UserVo);
    vo.roles = roleVos;
    return vo;
  }

  async createUser(createUserDto: CreateUserDto) {
    const user = await this.userRepository.findOneBy({
      userName: createUserDto.userName,
    });
    if (user) {
      throw new HttpException(
        {
          message: '操作失败,用户名已使用.',
        },
        HttpStatus.BAD_REQUEST
      );
    }
    const userEntity = new UserEntity();
    toEntity(createUserDto, userEntity);
    const { defaultPassword } = systemConfig;
    userEntity.password = crypto
      .MD5(crypto.MD5(defaultPassword).toString())
      .toString();
    userEntity.deleted = false;
    userEntity.enabled = true;
    userEntity.createTime = new Date();
    await this.userRepository.insert(userEntity);
  }

  async updateUserById(id: number, updateUserDto: UpdateUserDto) {
    const user = await this.getById(id);
    if (!user) {
      throw new HttpException(
        {
          message: '操作失败,未找到用户信息.',
        },
        HttpStatus.BAD_REQUEST
      );
    }
    const userEntity = new UserEntity();
    toEntity(updateUserDto, userEntity);
    await this.userRepository.update(id, userEntity);
  }

  async removeUserById(id: number) {
    await this.userRepository.delete(id);
  }

  async removeUserByIds(ids: string) {
    const arr = ids.split(',');
    await this.userRepository.delete(arr);
  }

  async enabledUserById(id: number) {
    const userEntity = new UserEntity();
    userEntity.enabled = true;
    await this.userRepository.update(id, userEntity);
  }

  async disableUserById(id: number) {
    const userEntity = new UserEntity();
    userEntity.enabled = false;
    await this.userRepository.update(id, userEntity);
  }

  async resetUserPasswordById(id: number) {
    const userEntity = new UserEntity();
    const { defaultPassword } = systemConfig;
    userEntity.password = crypto
      .MD5(crypto.MD5(defaultPassword).toString())
      .toString();
    await this.userRepository.update(id, userEntity);
  }

  async changePasswordById(id: number, changePasswordDto: ChangePasswordDto) {
    const { oldPassword, newPassword } = changePasswordDto;
    const user = await this.getById(id);
    if (!user) {
      throw new HttpException(
        {
          message: '修改密码失败,暂无此用户.',
        },
        HttpStatus.BAD_REQUEST
      );
    }
    const { password } = user;
    if (crypto.MD5(oldPassword.toString()).toString() !== password) {
      throw new HttpException(
        {
          message: '修改密码失败,原密码错误.',
        },
        HttpStatus.BAD_REQUEST
      );
    }
    const userEntity = new UserEntity();
    userEntity.password = crypto.MD5(newPassword.toString()).toString();
    await this.userRepository.update(id, userEntity);
  }

  async importExcel(file: any) {
    const { buffer } = file;
    const workbook = new ExcelJS.Workbook();
    await workbook.xlsx.load(buffer);
    const worksheet = workbook.getWorksheet(1);
    const result = new Array<CreateUserDto>();
    worksheet.eachRow((row, rowNumber) => {
      // 第一行是表头，故从第二行获取数据
      if (rowNumber > 1) {
        const target = new CreateUserDto();
        row.eachCell((cell, colNumber) => {
          if (colNumber === 1) {
            target.userId = cell.value.toString();
          } else if (colNumber === 2) {
            target.userName = cell.value.toString();
          } else if (colNumber === 3) {
            target.avatar = cell.value.toString();
          } else if (colNumber === 4) {
            target.fullName = cell.value.toString();
          } else if (colNumber === 5) {
            target.phone = cell.value.toString();
          } else if (colNumber === 6) {
            target.email = cell.value.toString();
          } else if (colNumber === 7) {
            target.address = cell.value.toString();
          } else if (colNumber === 8) {
            target.remark = cell.value.toString();
          }
        });
        result.push(target);
      }
    });

    result.forEach((element: CreateUserDto) => {
      this.createUser(element);
    });
  }

  async exportExcel() {
    const workbook = new ExcelJS.Workbook();
    const worksheet = workbook.addWorksheet('excel表格');
    // 定义表头名称和字段名
    worksheet.columns = [
      { header: '用户编号', key: 'user_id', width: 42 },
      { header: '用户名', key: 'user_name', width: 32 },
      { header: '头像', key: 'avatar', width: 32 },
      { header: '姓名', key: 'full_name', width: 32 },
      { header: '手机号', key: 'phone', width: 32 },
      { header: '邮箱', key: 'email', width: 32 },
      { header: '地址', key: 'address', width: 12 },
      { header: '备注', key: 'remark', width: 32 },
    ];
    const result = await this.getUserList(); // result是通过前端传递的ids从数据库获取需要导出的信息
    worksheet.addRows(result);
    // return workbook.xlsx.writeFile('用户.xlsx'); //直接到导出文件
    // return workbook.xlsx.writeBuffer(); // 前端接受到的数据格式为{type: 'buffer', data: []}

    const stream = await workbook.xlsx.writeBuffer();
    return stream;
  }

  private getById(id: number) {
    return this.userRepository.findOne({
      where: {
        id,
      },
    });
  }
}
