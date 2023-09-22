import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { toEntity } from "src/utils/dto2Entity";
import { Repository } from "typeorm";
import { CreateDictionaryTypeDto } from "./dto/create-dictionary-type.dto";
import { SearchDictionaryTypeDto } from "./dto/search-dictionary-type.dto";
import { UpdateDictionaryTypeDto } from "./dto/update-dictionary-type.dto";
import { DictionaryTypeEntity } from "./entities/dictionary-type.entity";
import { PageResponseResult } from "@/common/tools/page.response.result";

@Injectable()
export class DictionaryTypeService {
  @InjectRepository(DictionaryTypeEntity)
  private readonly dictionaryTypeRepository: Repository<DictionaryTypeEntity>;

  /**
   * 获取字典分类分页列表
   * @param searchDictionaryTypeDto 搜索dto
   */
  async getDictionaryTypePageList(
    searchDictionaryTypeDto: SearchDictionaryTypeDto
  ) {
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
      page.total,
      entities
    );
    return result;
  }

  /**
   * 获取字典分类列表
   */
  async getDictionaryTypeList() {
    const entities = await this.dictionaryTypeRepository.find();
    return entities;
  }

  /**
   * 根据字典分类id获取字典分类信息
   * @param id 主键
   */
  async getDictionaryTypeById(id: number) {
    const entity = await this.dictionaryTypeRepository.findOne({
      where: {
        id,
      },
    });
    return entity;
  }

  /**
   * 根据字典分类名称获取字典分类信息
   * @param dicTypeName 字典分类名称
   */
  async getDictionaryTypeByDictionaryTypeName(dicTypeName: string) {
    const entity = await this.dictionaryTypeRepository.findOneBy({
      dicTypeName,
    });
    return entity;
  }

  /**
   * 创建字典分类
   * @param createDictionaryTypeDto 创建字典分类dto
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
  }

  /**
   * 修改字典分类
   * @param id 主键
   * @param updateDictionaryTypeDto 修改字典分类dto
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
  }

  /**
   * 删除字典分类
   * @param id 主键
   */
  async removeDictionaryTypeById(id: number) {
    await this.dictionaryTypeRepository.delete(id);
  }
}
