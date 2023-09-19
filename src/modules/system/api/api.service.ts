import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Not, Repository } from "typeorm";
import * as ExcelJS from "exceljs";
import { CreateApiDto } from "./dto/create-api.dto";
import { SearchApiDto } from "./dto/search-api.dto";
import { UpdateApiDto } from "./dto/update-api.dto";
import { ApiEntity } from "./entities/api.entity";
import * as crypto from "crypto-js";
import { toEntity } from "src/utils/dto2Entity";
import { PageResponseResult } from "src/common/tools/page.response.result";

/*
 *@Description: 接口管理模块业务
 *返回接口数据时，排除掉超级管理员,超级管理员id为0，默认管理员接口名为administrator。切记
 *@Author: 土豆哥
 *@Date: 2022-11-28 22:20:27
 */
@Injectable()
export class ApiService {
  @InjectRepository(ApiEntity)
  private readonly apiRepository: Repository<ApiEntity>;

  /**
   * 获取接口分页列表
   * @param searchApiDto 搜索dto
   */
  async getApiPageList(searchApiDto: SearchApiDto) {
    const { page, keyword } = searchApiDto;
    const { current, size } = page;
    const skip = (current - 1) * size;
    const queryBuilder = this.apiRepository.createQueryBuilder();
    queryBuilder.where("id<>0");
    if (keyword) {
      queryBuilder.andWhere(`api_name=:apiName`, { apiName: keyword });
      queryBuilder.orWhere(`phone=:phone`, { phone: keyword });
    }
    const entities = await queryBuilder
      .orderBy("create_time", "DESC")
      .offset(skip)
      .limit(size)
      .getMany();

    page.total = await queryBuilder.getCount();
    const result = new PageResponseResult<ApiEntity[]>(page.total, entities);
    return result;
  }

  /**
   * 获取接口列表
   */
  async getApiList() {
    const entities = await this.apiRepository.find({
      where: {
        id: Not(0),
      },
    });
    return entities;
  }

  /**
   * 根据接口id获取接口信息
   * @param id 主键
   */
  async getApiById(id: number) {
    const entity = await this.getById(id);
    return entity;
  }

  /**
   * 根据接口名称获取接口信息
   * @param apiName 接口名称
   */
  async getApiByApiName(apiName: string) {
    const entity = await this.apiRepository.findOneBy({
      apiName,
    });
    return entity;
  }

  /**
   * 创建接口
   * @param createApiDto 创建接口dto
   */
  async createApi(createApiDto: CreateApiDto) {
    const api = await this.apiRepository.findOneBy({
      apiName: createApiDto.apiName,
    });
    if (api) {
      throw new HttpException(
        {
          message: "操作失败,接口名已使用.",
        },
        HttpStatus.BAD_REQUEST
      );
    }
    const apiEntity = new ApiEntity();
    toEntity(createApiDto, apiEntity);
    apiEntity.createTime = new Date();
    await this.apiRepository.insert(apiEntity);
  }

  /**
   * 修改接口
   * @param id 主键
   * @param updateApiDto 修改接口dto
   */
  async updateApiById(id: number, updateApiDto: UpdateApiDto) {
    const api = await this.getById(id);
    if (!api) {
      throw new HttpException(
        {
          message: "操作失败,未找到接口信息.",
        },
        HttpStatus.BAD_REQUEST
      );
    }
    const apiEntity = new ApiEntity();
    toEntity(updateApiDto, apiEntity);
    await this.apiRepository.update(id, apiEntity);
  }

  /**
   * 删除接口
   * @param id 主键
   */
  async removeApiById(id: number) {
    await this.apiRepository.delete(id);
  }

  /**
   * 批量删除接口
   * @param id 主键
   */
  async removeApiByIds(ids: string) {
    const arr = ids.split(",");
    await this.apiRepository.delete(arr);
  }

  private getById(id: number) {
    return this.apiRepository.findOne({
      where: {
        id,
      },
    });
  }
}
