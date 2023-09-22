import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { CreateQQGroupDto } from "./dto/create-qq-group.dto";
import { SearchQQGroupDto } from "./dto/search-qq-group.dto";
import { UpdateQQGroupDto } from "./dto/update-qq-group.dto";
import { QQGroupEntity } from "./entities/qq-group.entity";
import { toEntity } from "src/utils/dto2Entity";
import { PageResponseResult } from "src/common/tools/page.response.result";
import { qqOpts } from "../../../config/orm.config";

// eslint-disable-next-line @typescript-eslint/no-var-requires
const moment = require("moment");

/*
 *@Description: 用户管理模块业务
 *返回用户数据时，排除掉超级管理员,超级管理员id为0，默认管理员用户名为administrator。切记
 *@Author: 土豆哥
 *@Date: 2022-11-28 22:20:27
 */
@Injectable()
export class QQGroupService {
  @InjectRepository(QQGroupEntity, qqOpts.database.toString())
  private readonly qqGroupRepository: Repository<QQGroupEntity>;

  async statistics() {
    console.log(
      "days",
      moment().startOf("week").add(1, "days").format("yyyy-MM-DD")
    );

    //多对一方式
    // console.log('entities', '多对一方式');
    const entities = await this.qqGroupRepository
      .createQueryBuilder("group")
      .getMany();
    const date = new Date();
    const y = date.getFullYear();
    const m = date.getMonth() + 1;
    const d = date.getDate();
    const monthObj = entities.filter((item: QQGroupEntity) => {
      const date1 = new Date(item.createTime);
      const start = moment().startOf("week");
      const end = moment().endOf("week");
      return date1 > start && date1 < end;
    });
    const dayObj = entities.filter((item: QQGroupEntity) => {
      const date1 = new Date(item.createTime);
      const year = date1.getFullYear();
      const month = date1.getMonth() + 1;
      const day = date1.getDate();
      return y === year && m === month && d === day;
    });
    const yesterObj = entities.filter((item: QQGroupEntity) => {
      const date1 = new Date(item.createTime);
      const year = date1.getFullYear();
      const month = date1.getMonth() + 1;
      const day = date1.getDate();
      return y === year && m === month && d - 1 === day;
    });
    const weekObj = entities.filter((item: QQGroupEntity) => {
      const date1 = new Date(item.createTime);
      const start = moment().startOf("week");
      const end = moment().endOf("week");
      return date1 > start && date1 < end;
    });

    //周日
    const day1Obj = entities.filter((item: QQGroupEntity) => {
      const date1 = moment(item.createTime).format("yyyy-MM-DD");
      const start = moment()
        .startOf("week")
        .add(1, "days")
        .format("yyyy-MM-DD");
      return date1 === start;
    });

    const day2Obj = entities.filter((item: QQGroupEntity) => {
      const date1 = moment(item.createTime).format("yyyy-MM-DD");
      const start = moment()
        .startOf("week")
        .add(2, "days")
        .format("yyyy-MM-DD");
      return date1 === start;
    });

    const day3Obj = entities.filter((item: QQGroupEntity) => {
      const date1 = moment(item.createTime).format("yyyy-MM-DD");
      const start = moment()
        .startOf("week")
        .add(3, "days")
        .format("yyyy-MM-DD");
      return date1 === start;
    });

    const day4Obj = entities.filter((item: QQGroupEntity) => {
      const date1 = moment(item.createTime).format("yyyy-MM-DD");
      const start = moment()
        .startOf("week")
        .add(4, "days")
        .format("yyyy-MM-DD");
      return date1 === start;
    });

    const day5Obj = entities.filter((item: QQGroupEntity) => {
      const date1 = moment(item.createTime).format("yyyy-MM-DD");
      const start = moment()
        .startOf("week")
        .add(5, "days")
        .format("yyyy-MM-DD");
      return date1 === start;
    });

    const day6Obj = entities.filter((item: QQGroupEntity) => {
      const date1 = moment(item.createTime).format("yyyy-MM-DD");
      const start = moment()
        .startOf("week")
        .add(6, "days")
        .format("yyyy-MM-DD");
      return date1 === start;
    });

    const day7Obj = entities.filter((item: QQGroupEntity) => {
      const date1 = moment(item.createTime).format("yyyy-MM-DD");
      const start = moment()
        .startOf("week")
        .add(7, "days")
        .format("yyyy-MM-DD");
      return date1 === start;
    });

    const result = {
      yesterDayOrderNum: yesterObj.length,
      monthOrderNum: monthObj.length,
      dayOrderNum: dayObj.length,
      weekOrderNum: weekObj.length,
      dayData: [
        day1Obj.length,
        day2Obj.length,
        day3Obj.length,
        day4Obj.length,
        day5Obj.length,
        day6Obj.length,
        day7Obj.length,
      ],
    };
    return result;
  }

  async getQQGroupPageList(searchQQGroupDto: SearchQQGroupDto) {
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
      .orderBy("status", "ASC")
      .addOrderBy("create_time", "DESC")
      .offset(skip)
      .limit(size)
      .getMany();

    page.total = await queryBuilder.getCount();
    const result = new PageResponseResult<QQGroupEntity[]>(
      page.total,
      entities
    );
    return result;
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

  async excuteQQGroupById(id: number) {
    const qqGroupEntity = new QQGroupEntity();
    qqGroupEntity.status = 1;
    await this.qqGroupRepository.update(id, qqGroupEntity);
  }

  async batchExcuteQQGroupByIds(ids: string) {
    const arr = ids.split(",");
    const qqGroupEntity = new QQGroupEntity();
    qqGroupEntity.status = 1;
    await this.qqGroupRepository.update(arr, qqGroupEntity);
  }

  private getById(id: number) {
    return this.qqGroupRepository.findOne({
      where: {
        id,
      },
    });
  }
}
