import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Not, Repository } from "typeorm";
import * as ExcelJS from "exceljs";
import { CreateQQGroupDto } from "./dto/create-qq-group.dto";
import { SearchQQGroupDto } from "./dto/search-qq-group.dto";
import { UpdateQQGroupDto } from "./dto/update-qq-group.dto";
import { QQGroupEntity } from "./entities/qq-group.entity";
import * as crypto from "crypto-js";
import { toEntity } from "src/utils/dto2Entity";
import systemConfig from "../../../config/system.config";
import { InjectMapper } from "@automapper/nestjs";
import { Mapper } from "@automapper/core";
import { QQGroupVo } from "./vo/qq-group.vo";
import { PageResponseResult } from "src/common/tools/page.response.result";
import { qqOpts } from "../../../config/orm.config";
/*
 *@Description: 用户管理模块业务
 *返回用户数据时，排除掉超级管理员,超级管理员id为0，默认管理员用户名为administrator。切记
 *@Author: 土豆哥
 *@Date: 2022-11-28 22:20:27
 */
@Injectable()
export class QQGroupService {
  constructor(@InjectMapper() mapper: Mapper) {
    this.mapper = mapper;
  }

  private readonly mapper: Mapper;
  @InjectRepository(QQGroupEntity, qqOpts.database.toString())
  private readonly qqGroupRepository: Repository<QQGroupEntity>;

  async getQQGroupPageList(
    searchQQGroupDto: SearchQQGroupDto
  ): Promise<PageResponseResult<QQGroupVo[]>> {
    const { page, keyword, orderId, content, status } = searchQQGroupDto;
    const { current, size } = page;
    const skip = (current - 1) * size;
    const queryBuilder = this.qqGroupRepository.createQueryBuilder();
    queryBuilder.where("id<>0");
    if (keyword) {
      queryBuilder.andWhere(`keyword=:keyword`, {
        keyword: keyword,
      });
    }
    if (orderId) {
      queryBuilder.andWhere(`order_id=:orderId`, {
        orderId: orderId,
      });
    }
    if (content) {
      queryBuilder.andWhere(`content=:content`, {
        content: content,
      });
    }
    if (status) {
      queryBuilder.andWhere(`status=:status`, {
        status: status,
      });
    }
    const entities = await queryBuilder
      .orderBy("create_time", "DESC")
      .offset(skip)
      .limit(size)
      .getMany();

    const vos = await this.mapper.mapArrayAsync(
      entities,
      QQGroupEntity,
      QQGroupVo
    );
    page.total = await this.qqGroupRepository.count();
    const data = new PageResponseResult<QQGroupVo[]>();
    data.payload = vos;
    data.total = page.total;
    return data;
  }

  async getQQGroupList() {
    //多对一方式
    // console.log('entities', '多对一方式');
    const entities = await this.qqGroupRepository
      .createQueryBuilder("u")
      .leftJoinAndSelect("u.roles", "system_roles")
      .getMany();
    //一对多方式
    // const entities = await this.qqGroupRepository
    //   .createQueryBuilder('u')
    //   .leftJoinAndSelect('u.qqGroupRoles', 'per_qqGroup_roles')
    //   .getMany();
    //关联时，使用此方式，得不到关联属性值
    // const entities = await this.qqGroupRepository.find({
    //   where: {
    //     id: Not(0),
    //   },
    // });

    return entities;
  }

  async getQQGroupById(id: number) {
    const entity = await this.qqGroupRepository
      .createQueryBuilder("u")
      .leftJoinAndSelect("u.roles", "system_roles")
      .andWhere(`u.id=:id`, { id: id })
      .getOne();
    return entity;
    // const entity = await this.getById(id);
    // const vo = await this.mapper.mapAsync(entity, QQGroupEntity, QQGroupVo);
    // // const roleVos = await this.mapper.mapArrayAsync(
    // //   entity.roles,
    // //   RoleEntity,
    // //   RoleVo
    // // );
    // // vo.roles = roleVos;
    // return vo;
  }

  async getQQGroupByQQGroupName(qqGroupName: string) {
    // const entity = await this.qqGroupRepository.findOneBy({
    //   qqGroupName,
    // });

    const entity = await this.qqGroupRepository
      .createQueryBuilder("u")
      .leftJoinAndSelect("u.roles", "system_roles")
      .andWhere(`qqGroup_name=:qqGroupName`, { qqGroupName: qqGroupName })
      .getOne();
    return entity;
  }

  async createQQGroup(createQQGroupDto: CreateQQGroupDto) {
    const qqGroupEntity = new QQGroupEntity();
    toEntity(createQQGroupDto, qqGroupEntity);
    qqGroupEntity.createTime = new Date();
    await this.qqGroupRepository.insert(qqGroupEntity);
  }

  async updateQQGroupById(id: number, updateQQGroupDto: UpdateQQGroupDto) {
    const qqGroup = await this.getById(id);
    if (!qqGroup) {
      throw new HttpException(
        {
          message: "操作失败,未找到用户信息.",
        },
        HttpStatus.BAD_REQUEST
      );
    }
    const qqGroupEntity = new QQGroupEntity();
    toEntity(updateQQGroupDto, qqGroupEntity);
    await this.qqGroupRepository.update(id, qqGroupEntity);
  }

  async removeQQGroupById(id: number) {
    await this.qqGroupRepository.delete(id);
  }

  async removeQQGroupByIds(ids: string) {
    const arr = ids.split(",");
    await this.qqGroupRepository.delete(arr);
  }

  private getById(id: number) {
    return this.qqGroupRepository.findOne({
      where: {
        id,
      },
    });
  }
}
