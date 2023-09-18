import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { toEntity } from "src/utils/dto2Entity";
import { Repository } from "typeorm";
import { CreateDictionaryTypeDto } from "./dto/create-dictionary-type.dto";
import { SearchDictionaryTypeDto } from "./dto/search-dictionary-type.dto";
import { UpdateDictionaryTypeDto } from "./dto/update-dictionary-type.dto";
import { DictionaryTypeEntity } from "./entities/dictionary-type.entity";
import { ResponseResult } from "@/common/tools/response.result";
import { ResponseStatus } from "@/common/enums/response-status.enum";
import { PageResponseResult } from "@/common/tools/page.response.result";

@Injectable()
export class DictionaryTypeService {
  @InjectRepository(DictionaryTypeEntity)
  private readonly dictionaryTypeRepository: Repository<DictionaryTypeEntity>;

  /**
   * 获取字典分类分页列表
   * @param searchDictionaryTypeDto 搜索dto
   * @returns Promise<PageResponseResult<DictionaryTypeEntity[]>>
   */
  async getDictionaryTypePageList(
    searchDictionaryTypeDto: SearchDictionaryTypeDto
  ): Promise<ResponseResult<DictionaryTypeEntity[]>> {
    const { page, keyword } = searchDictionaryTypeDto;
    const { current, size } = page;
    const skip = (current - 1) * size;
    const queryBuilder = this.dictionaryTypeRepository.createQueryBuilder();
    if (keyword) {
      queryBuilder.where(`dictionaryType_name=:dictionaryTypeName`, {
        dictionaryTypeName: keyword,
      });
      queryBuilder.orWhere(`phone=:phone`, { phone: keyword });
    }
    const entities = await queryBuilder
      .orderBy("create_time", "DESC")
      .offset(skip)
      .limit(size)
      .getMany();
    page.total = await queryBuilder.getCount();
    const result = new PageResponseResult<DictionaryTypeEntity[]>(
      ResponseStatus.success,
      "操作成功",
      page.total,
      entities
    );
    return result;
  }

  /**
   * 获取字典分类列表
   * @returns Promise<ResponseResult<DictionaryTypeEntity[]>>
   */
  async getDictionaryTypeList(): Promise<
    ResponseResult<DictionaryTypeEntity[]>
  > {
    const entities = await this.dictionaryTypeRepository.find();
    const result = new ResponseResult<DictionaryTypeEntity[]>(
      ResponseStatus.success,
      "操作成功",
      entities
    );
    return result;
  }

  /**
   * 根据字典分类id获取字典分类信息
   * @param id 主键
   * @returns
   */
  async getDictionaryTypeById(
    id: number
  ): Promise<ResponseResult<DictionaryTypeEntity>> {
    const entity = await this.dictionaryTypeRepository.findOne({
      where: {
        id,
      },
    });
    const result = new ResponseResult<DictionaryTypeEntity>(
      ResponseStatus.success,
      "操作成功",
      entity
    );
    return result;
  }

  /**
   * 根据字典分类名称获取字典分类信息
   * @param dicTypeName 字典分类名称
   * @returns
   */
  async getDictionaryTypeByDictionaryTypeName(
    dicTypeName: string
  ): Promise<ResponseResult<DictionaryTypeEntity>> {
    const entity = await this.dictionaryTypeRepository.findOneBy({
      dicTypeName,
    });
    const result = new ResponseResult<DictionaryTypeEntity>(
      ResponseStatus.success,
      "操作成功",
      entity
    );
    return result;
  }

  /**
   * 创建字典分类
   * @param createDictionaryTypeDto 创建字典分类dto
   * @returns  Promise<ResponseResult>
   */
  async createDictionaryType(createDictionaryTypeDto: CreateDictionaryTypeDto) {
    const dictionaryType = await this.dictionaryTypeRepository.findOneBy({
      dicTypeName: createDictionaryTypeDto.dicTypeName,
    });
    if (dictionaryType) {
      throw new HttpException(
        "操作失败,字典分类名已使用.",
        HttpStatus.BAD_REQUEST
      );
    }
    const dictionaryTypeEntity = new DictionaryTypeEntity();
    toEntity(createDictionaryTypeDto, dictionaryTypeEntity);
    await this.dictionaryTypeRepository.insert(dictionaryTypeEntity);
    const result = new ResponseResult(ResponseStatus.success, "操作成功");
    return result;
  }

  /**
   * 修改字典分类
   * @param id 主键
   * @param updateDictionaryTypeDto 修改字典分类dto
   * @returns Promise<ResponseResult>
   */
  async updateDictionaryTypeById(
    id: number,
    updateDictionaryTypeDto: UpdateDictionaryTypeDto
  ) {
    const dictionaryType = await this.getDictionaryTypeById(id);
    if (!dictionaryType) {
      throw new HttpException(
        "操作失败,未找到字典分类信息.",
        HttpStatus.BAD_REQUEST
      );
    }
    const dictionaryTypeEntity = new DictionaryTypeEntity();
    toEntity(updateDictionaryTypeDto, dictionaryTypeEntity);
    await this.dictionaryTypeRepository.update(id, dictionaryTypeEntity);
    const result = new ResponseResult(ResponseStatus.success, "操作成功");
    return result;
  }

  /**
   * 删除字典分类
   * @param id 主键
   * @returns  Promise<ResponseResult>
   */
  async removeDictionaryTypeById(id: number) {
    await this.dictionaryTypeRepository.delete(id);
    const result = new ResponseResult(ResponseStatus.success, "操作成功");
    return result;
  }
}
