import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import * as ExcelJS from "exceljs";
import { CreateUserDto } from "./dto/create-user.dto";
import { SearchUserDto } from "./dto/search-user.dto";
import { UpdateUserDto } from "./dto/update-user.dto";
import { UserEntity } from "./entities/user.entity";
import * as crypto from "crypto-js";
import { toEntity } from "src/utils/dto2Entity";
import systemConfig from "../../../config/system.config";
import { ChangePasswordDto } from "./dto/change-password.dto";
import { Mapper } from "@automapper/core";
import { PageResponseResult } from "src/common/tools/page.response.result";
import { ResponseStatus } from "@/common/enums/response-status.enum";
import { ResponseResult } from "@/common/tools/response.result";

/*
 *@Description: 用户管理模块业务
 *返回用户数据时，排除掉超级管理员,超级管理员id为0，默认管理员用户名为administrator。切记
 *@Author: 土豆哥
 *@Date: 2022-11-28 22:20:27
 */
@Injectable()
export class UserService {
  private readonly mapper: Mapper;
  @InjectRepository(UserEntity)
  private readonly userRepository: Repository<UserEntity>;

  /**
   * 获取用户分页列表
   * @param searchUserDto 搜索dto
   * @returns Promise<PageResponseResult<UserEntity[]>>
   */
  async getUserPageList(
    searchUserDto: SearchUserDto
  ): Promise<PageResponseResult<UserEntity[]>> {
    const { page, keyword } = searchUserDto;
    const { current, size } = page;
    const skip = (current - 1) * size;
    const queryBuilder = this.userRepository.createQueryBuilder();
    queryBuilder.where("id<>0");
    if (keyword) {
      queryBuilder.andWhere(`user_name=:userName`, { userName: keyword });
      queryBuilder.orWhere(`phone=:phone`, { phone: keyword });
    }
    const entities = await queryBuilder
      .orderBy("create_time", "DESC")
      .offset(skip)
      .limit(size)
      .getMany();
    page.total = await queryBuilder.getCount();
    const result = new PageResponseResult<UserEntity[]>(
      ResponseStatus.success,
      "操作成功",
      page.total,
      entities
    );
    return result;
  }

  /**
   * 获取用户列表
   * @returns Promise<ResponseResult<UserEntity[]>>
   */
  async getUserList(): Promise<ResponseResult<UserEntity[]>> {
    const entities = await this.userRepository
      .createQueryBuilder("u")
      .leftJoinAndSelect("u.roles", "system_roles")
      .getMany();
    const result = new ResponseResult<UserEntity[]>(
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
  async getUserById(id: number): Promise<ResponseResult<UserEntity>> {
    const entity = await this.userRepository
      .createQueryBuilder("u")
      .leftJoinAndSelect("u.roles", "system_roles")
      .andWhere(`u.id=:id`, { id: id })
      .getOne();
    const result = new ResponseResult<UserEntity>(
      ResponseStatus.success,
      "操作成功",
      entity
    );
    return result;
  }

  /**
   * 根据用户名称获取用户信息
   * @param userName 用户名称
   * @returns
   */
  async getUserByUserName(
    userName: string
  ): Promise<ResponseResult<UserEntity>> {
    // const entity = await this.userRepository.findOneBy({
    //   userName,
    // });

    const entity = await this.userRepository
      .createQueryBuilder("u")
      .leftJoinAndSelect("u.roles", "system_roles")
      .andWhere(`user_name=:userName`, { userName: userName })
      .getOne();
    const result = new ResponseResult<UserEntity>(
      ResponseStatus.success,
      "操作成功",
      entity
    );
    return result;
  }

  /**
   * 创建用户
   * @param createUserDto 创建用户dto
   * @returns  Promise<ResponseResult>
   */
  async createUser(createUserDto: CreateUserDto): Promise<ResponseResult> {
    const user = await this.userRepository.findOneBy({
      userName: createUserDto.userName,
    });
    if (user) {
      throw new HttpException(
        {
          message: "操作失败,用户名已使用.",
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
    const result = new ResponseResult(ResponseStatus.success, "操作成功");
    return result;
  }

  /**
   * 修改用户
   * @param id 主键
   * @param updateUserDto 修改用户dto
   * @returns Promise<ResponseResult>
   */
  async updateUserById(
    id: number,
    updateUserDto: UpdateUserDto
  ): Promise<ResponseResult> {
    const user = await this.getById(id);
    if (!user) {
      throw new HttpException(
        {
          message: "操作失败,未找到用户信息.",
        },
        HttpStatus.BAD_REQUEST
      );
    }
    const userEntity = new UserEntity();
    toEntity(updateUserDto, userEntity);
    await this.userRepository.update(id, userEntity);
    const result = new ResponseResult(ResponseStatus.success, "操作成功");
    return result;
  }

  /**
   * 删除用户
   * @param id 主键
   * @returns  Promise<ResponseResult>
   */
  async removeUserById(id: number): Promise<ResponseResult> {
    await this.userRepository.delete(id);
    const result = new ResponseResult(ResponseStatus.success, "操作成功");
    return result;
  }

  /**
   * 批量删除用户
   * @param id 主键
   * @returns  Promise<ResponseResult>
   */
  async removeUserByIds(ids: string): Promise<ResponseResult> {
    const arr = ids.split(",");
    await this.userRepository.delete(arr);
    const result = new ResponseResult(ResponseStatus.success, "操作成功");
    return result;
  }

  /**
   * 启用用户
   * @param id 主键
   * @returns Promise<ResponseResult>
   */
  async enabledUserById(id: number): Promise<ResponseResult> {
    const userEntity = new UserEntity();
    userEntity.enabled = true;
    await this.userRepository.update(id, userEntity);
    const result = new ResponseResult(ResponseStatus.success, "操作成功");
    return result;
  }

  /**
   * 禁用用户
   * @param id 主键
   * @returns Promise<ResponseResult>
   */
  async disableUserById(id: number): Promise<ResponseResult> {
    const userEntity = new UserEntity();
    userEntity.enabled = false;
    await this.userRepository.update(id, userEntity);
    const result = new ResponseResult(ResponseStatus.success, "操作成功");
    return result;
  }

  /**
   * 重置用户密码
   * @param id 主键
   * @returns Promise<ResponseResult>
   */
  async resetUserPasswordById(id: number): Promise<ResponseResult> {
    const userEntity = new UserEntity();
    const { defaultPassword } = systemConfig;
    userEntity.password = crypto
      .MD5(crypto.MD5(defaultPassword).toString())
      .toString();
    await this.userRepository.update(id, userEntity);
    const result = new ResponseResult(ResponseStatus.success, "操作成功");
    return result;
  }

  /**
   * 修改用户密码
   * @param id 主键
   * @returns Promise<ResponseResult>
   */
  async changePasswordById(
    id: number,
    changePasswordDto: ChangePasswordDto
  ): Promise<ResponseResult> {
    const { oldPassword, newPassword } = changePasswordDto;
    const user = await this.getById(id);
    if (!user) {
      throw new HttpException(
        {
          message: "修改密码失败,暂无此用户.",
        },
        HttpStatus.BAD_REQUEST
      );
    }
    const { password } = user;
    if (crypto.MD5(oldPassword.toString()).toString() !== password) {
      throw new HttpException(
        {
          message: "修改密码失败,原密码错误.",
        },
        HttpStatus.BAD_REQUEST
      );
    }
    const userEntity = new UserEntity();
    userEntity.password = crypto.MD5(newPassword.toString()).toString();
    await this.userRepository.update(id, userEntity);
    const result = new ResponseResult(ResponseStatus.success, "操作成功");
    return result;
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
    const worksheet = workbook.addWorksheet("excel表格");
    // 定义表头名称和字段名
    worksheet.columns = [
      { header: "用户编号", key: "user_id", width: 42 },
      { header: "用户名", key: "user_name", width: 32 },
      { header: "头像", key: "avatar", width: 32 },
      { header: "姓名", key: "full_name", width: 32 },
      { header: "手机号", key: "phone", width: 32 },
      { header: "邮箱", key: "email", width: 32 },
      { header: "地址", key: "address", width: 12 },
      { header: "备注", key: "remark", width: 32 },
    ];
    const result = await this.getUserList(); // result是通过前端传递的ids从数据库获取需要导出的信息
    worksheet.addRows(result.data);
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
