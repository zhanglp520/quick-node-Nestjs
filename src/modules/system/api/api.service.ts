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
import { InjectMapper } from "@automapper/nestjs";
import { Mapper } from "@automapper/core";
import { ApiVo } from "./vo/api.vo";
import { PageResponseResult } from "src/common/tools/page.response.result";
/*
 *@Description: 接口管理模块业务
 *返回接口数据时，排除掉超级管理员,超级管理员id为0，默认管理员接口名为administrator。切记
 *@Author: 土豆哥
 *@Date: 2022-11-28 22:20:27
 */
@Injectable()
export class ApiService {
  constructor(@InjectMapper() mapper: Mapper) {
    this.mapper = mapper;
  }

  private readonly mapper: Mapper;
  @InjectRepository(ApiEntity)
  private readonly apiRepository: Repository<ApiEntity>;

  async getApiPageList(
    searchApiDto: SearchApiDto
  ): Promise<PageResponseResult<ApiVo[]>> {
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

    const vos = await this.mapper.mapArrayAsync(entities, ApiEntity, ApiVo);
    page.total = await this.apiRepository.count();
    const data = new PageResponseResult<ApiVo[]>();
    data.payload = vos;
    data.total = page.total;
    return data;
  }

  async getApiList() {
    const entities = await this.apiRepository.find({
      where: {
        id: Not(0),
      },
    });
    const vos = await this.mapper.mapArrayAsync(entities, ApiEntity, ApiVo);
    return vos;
  }

  async getApiById(id: number) {
    const entity = await this.getById(id);
    const vo = await this.mapper.mapAsync(entity, ApiEntity, ApiVo);
    return vo;
  }

  async getApiByApiName(apiName: string) {
    const entity = await this.apiRepository.findOneBy({
      apiName,
    });
    const vo = await this.mapper.mapAsync(entity, ApiEntity, ApiVo);
    return vo;
  }

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

  async removeApiById(id: number) {
    await this.apiRepository.delete(id);
  }

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
