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
import { PageResponseResult } from "src/common/tools/page.response.result";
import { ResponseStatus } from "@/common/enums/response-status.enum";
import { ResponseResult } from "@/common/tools/response.result";
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

  /**
   * 获取接口分页列表
   * @param searchApiDto 搜索dto
   * @returns Promise<PageResponseResult<ApiEntity[]>>
   */
  async getApiPageList(
    searchApiDto: SearchApiDto
  ): Promise<PageResponseResult<ApiEntity[]>> {
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

    page.total = await this.apiRepository.count();
    const result = new PageResponseResult<ApiEntity[]>(
      ResponseStatus.success,
      "操作成功",
      page.total,
      entities
    );
    return result;
  }

  /**
   * 获取接口列表
   * @returns Promise<ResponseResult<ApiEntity[]>>
   */
  async getApiList(): Promise<ResponseResult<ApiEntity[]>> {
    const entities = await this.apiRepository.find({
      where: {
        id: Not(0),
      },
    });
    const result = new ResponseResult<ApiEntity[]>(
      ResponseStatus.success,
      "操作成功",
      entities
    );
    return result;
  }

  /**
   * 根据接口id获取接口信息
   * @param id 主键
   * @returns
   */
  async getApiById(id: number): Promise<ResponseResult<ApiEntity>> {
    const entity = await this.getById(id);
    const result = new ResponseResult<ApiEntity>(
      ResponseStatus.success,
      "操作成功",
      entity
    );
    return result;
  }

  /**
   * 根据接口名称获取接口信息
   * @param apiName 接口名称
   * @returns
   */
  async getApiByApiName(apiName: string): Promise<ResponseResult<ApiEntity>> {
    const entity = await this.apiRepository.findOneBy({
      apiName,
    });
    const result = new ResponseResult<ApiEntity>(
      ResponseStatus.success,
      "操作成功",
      entity
    );
    return result;
  }

  /**
   * 创建接口
   * @param createApiDto 创建接口dto
   * @returns  Promise<ResponseResult>
   */
  async createApi(createApiDto: CreateApiDto): Promise<ResponseResult> {
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
    const result = new ResponseResult<ApiEntity>(
      ResponseStatus.success,
      "操作成功"
    );
    return result;
  }

  /**
   * 修改接口
   * @param id 主键
   * @param updateApiDto 修改接口dto
   * @returns Promise<ResponseResult>
   */
  async updateApiById(
    id: number,
    updateApiDto: UpdateApiDto
  ): Promise<ResponseResult> {
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
    const result = new ResponseResult<ApiEntity>(
      ResponseStatus.success,
      "操作成功"
    );
    return result;
  }

  /**
   * 删除接口
   * @param id 主键
   * @returns  Promise<ResponseResult>
   */
  async removeApiById(id: number): Promise<ResponseResult> {
    await this.apiRepository.delete(id);
    const result = new ResponseResult<ApiEntity>(
      ResponseStatus.success,
      "操作成功"
    );
    return result;
  }

  /**
   * 批量删除接口
   * @param id 主键
   * @returns  Promise<ResponseResult>
   */
  async removeApiByIds(ids: string): Promise<ResponseResult> {
    const arr = ids.split(",");
    await this.apiRepository.delete(arr);
    const result = new ResponseResult<ApiEntity>(
      ResponseStatus.success,
      "操作成功"
    );
    return result;
  }

  private getById(id: number) {
    return this.apiRepository.findOne({
      where: {
        id,
      },
    });
  }
}
