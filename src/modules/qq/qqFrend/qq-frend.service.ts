import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { CreateQQFrendDto } from "./dto/create-qq-frend.dto";
import { SearchQQFrendDto } from "./dto/search-qq-frend.dto";
import { UpdateQQFrendDto } from "./dto/update-qq-frend.dto";
import { QQFrendEntity } from "./entities/qq-frend.entity";
import { toEntity } from "src/utils/dto2Entity";
import { PageResponseResult } from "src/common/tools/page.response.result";
import { qqOpts } from "../../../config/orm.config";

// eslint-disable-next-line @typescript-eslint/no-var-requires
const moment = require("moment");

/*
 *@Description: qq好友管理模块业务
 *@Author: 土豆哥
 *@Date: 2022-11-28 22:20:27
 */
@Injectable()
export class QQFrendService {
  @InjectRepository(QQFrendEntity, qqOpts.database.toString())
  private readonly qqFrendRepository: Repository<QQFrendEntity>;

  async statistics() {
    const entities = await this.qqFrendRepository
      .createQueryBuilder("frend")
      .getMany();
    const date = new Date();
    const y = date.getFullYear();
    const m = date.getMonth() + 1;
    const d = date.getDate();

    const dayObj = entities.filter((item: QQFrendEntity) => {
      const date1 = new Date(item.createTime);
      const year = date1.getFullYear();
      const month = date1.getMonth() + 1;
      const day = date1.getDate();
      return y === year && m === month && d === day;
    });

    const result = {
      dayOrderNum: dayObj.length,
    };
    return result;
  }

  async getQQFrendPageList(searchQQFrendDto: SearchQQFrendDto) {
    const { page, keyword, orderId, content, status } = searchQQFrendDto;
    const { current, size } = page;
    const skip = (current - 1) * size;
    const queryBuilder = this.qqFrendRepository.createQueryBuilder();
    queryBuilder.where("id<>0");
    // if (keyword) {
    //   queryBuilder.andWhere(`u.user_name=:userName`, { userName: keyword });
    //   queryBuilder.orWhere(`u.phone=:phone`, { phone: keyword });
    // }
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
    const result = new PageResponseResult<QQFrendEntity[]>(
      page.total,
      entities
    );
    return result;
  }

  async getQQFrendList() {
    //多对一方式
    // console.log('entities', '多对一方式');
    const entities = await this.qqFrendRepository
      .createQueryBuilder("u")
      .leftJoinAndSelect("u.roles", "system_roles")
      .getMany();
    //一对多方式
    // const entities = await this.qqFrendRepository
    //   .createQueryBuilder('u')
    //   .leftJoinAndSelect('u.qqFrendRoles', 'per_qqFrend_roles')
    //   .getMany();
    //关联时，使用此方式，得不到关联属性值
    // const entities = await this.qqFrendRepository.find({
    //   where: {
    //     id: Not(0),
    //   },
    // });

    return entities;
  }

  async getQQFrendById(id: number) {
    const entity = await this.qqFrendRepository
      .createQueryBuilder("u")
      .leftJoinAndSelect("u.roles", "system_roles")
      .andWhere(`u.id=:id`, { id: id })
      .getOne();
    return entity;
    // const entity = await this.getById(id);
    // const vo = await this.mapper.mapAsync(entity, QQFrendEntity, QQFrendVo);
    // // const roleVos = await this.mapper.mapArrayAsync(
    // //   entity.roles,
    // //   RoleEntity,
    // //   RoleVo
    // // );
    // // vo.roles = roleVos;
    // return vo;
  }

  async getQQFrendByQQFrendName(qqFrendName: string) {
    // const entity = await this.qqFrendRepository.findOneBy({
    //   qqFrendName,
    // });

    const entity = await this.qqFrendRepository
      .createQueryBuilder("u")
      .leftJoinAndSelect("u.roles", "system_roles")
      .andWhere(`qqFrend_name=:qqFrendName`, { qqFrendName: qqFrendName })
      .getOne();
    return entity;
  }

  async createQQFrend(createQQFrendDto: CreateQQFrendDto) {
    const qqFrendEntity = new QQFrendEntity();
    toEntity(createQQFrendDto, qqFrendEntity);
    qqFrendEntity.createTime = new Date();
    await this.qqFrendRepository.insert(qqFrendEntity);
  }

  async updateQQFrendById(id: number, updateQQFrendDto: UpdateQQFrendDto) {
    const qqFrend = await this.getById(id);
    if (!qqFrend) {
      throw new HttpException(
        {
          message: "操作失败,未找到用户信息.",
        },
        HttpStatus.BAD_REQUEST
      );
    }
    const qqFrendEntity = new QQFrendEntity();
    toEntity(updateQQFrendDto, qqFrendEntity);
    await this.qqFrendRepository.update(id, qqFrendEntity);
  }

  async removeQQFrendById(id: number) {
    await this.qqFrendRepository.delete(id);
  }

  async removeQQFrendByIds(ids: string) {
    const arr = ids.split(",");
    await this.qqFrendRepository.delete(arr);
  }

  async excuteQQFrendById(id: number) {
    const qqFrendEntity = new QQFrendEntity();
    qqFrendEntity.status = 1;
    await this.qqFrendRepository.update(id, qqFrendEntity);
  }

  async batchExcuteQQFrendByIds(ids: string) {
    const arr = ids.split(",");
    const qqFrendEntity = new QQFrendEntity();
    qqFrendEntity.status = 1;
    await this.qqFrendRepository.update(arr, qqFrendEntity);
  }

  private getById(id: number) {
    return this.qqFrendRepository.findOne({
      where: {
        id,
      },
    });
  }
}
