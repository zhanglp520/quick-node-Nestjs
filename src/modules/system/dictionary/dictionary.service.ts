import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { toEntity } from "src/utils/dto2Entity";
import { Repository } from "typeorm";
import { CreateDictionaryDto } from "./dto/create-dictionary.dto";
import { SearchDictionaryDto } from "./dto/search-dictionary.dto";
import { UpdateDictionaryDto } from "./dto/update-dictionary.dto";
import { DictionaryEntity } from "./entities/dictionary.entity";
import { PageResponseResult } from "@/common/tools/page.response.result";

@Injectable()
export class DictionaryService {
  @InjectRepository(DictionaryEntity)
  private readonly dictionaryRepository: Repository<DictionaryEntity>;

  /**
   * 获取字典分页列表
   * @param searchDictionaryDto 搜索dto
   */
  async getDictionaryPageList(searchDictionaryDto: SearchDictionaryDto) {
    const { page, keyword } = searchDictionaryDto;
    const { current, size } = page;
    const skip = (current - 1) * size;
    const queryBuilder = this.dictionaryRepository.createQueryBuilder();
    if (keyword) {
      queryBuilder.where(`dictionary_name=:dictionaryName`, {
        dictionaryName: keyword,
      });
      queryBuilder.orWhere(`phone=:phone`, { phone: keyword });
    }
    const entities = await queryBuilder
      .orderBy("create_time", "DESC")
      .offset(skip)
      .limit(size)
      .getMany();
    page.total = await queryBuilder.getCount();
    const result = new PageResponseResult<DictionaryEntity[]>(
      page.total,
      entities
    );
    return result;
  }

  /**
   * 获取字典列表
   */
  async getDictionaryListByTypeId(typeId: string) {
    const queryBuilder = this.dictionaryRepository.createQueryBuilder();
    if (!typeId) {
      throw new HttpException(
        {
          message: "请求参数错误,未找到typeId参数.",
        },
        HttpStatus.BAD_REQUEST
      );
    }
    queryBuilder.where(`dic_type_id=:typeId`, {
      typeId,
    });
    const entities = await queryBuilder.getMany();
    return entities;
  }

  /**
   * 根据字典id获取字典信息
   * @param id 主键
   */
  async getDictionaryById(id: number) {
    const entity = await this.dictionaryRepository.findOne({
      where: {
        id,
      },
    });
    return entity;
  }

  /**
   * 根据字典名称获取字典信息
   * @param dicName 字典名称
   */
  async getDictionaryByDictionaryName(dicName: string) {
    const entity = await this.dictionaryRepository.findOneBy({
      dicName,
    });
    return entity;
  }

  /**
   * 创建字典
   * @param createDictionaryDto 创建字典dto
   */
  async createDictionary(createDictionaryDto: CreateDictionaryDto) {
    const dictionary = await this.dictionaryRepository.findOneBy({
      dicName: createDictionaryDto.dicName,
    });
    if (dictionary) {
      throw new HttpException("操作失败,字典名已使用.", HttpStatus.BAD_REQUEST);
    }
    const dictionaryEntity = new DictionaryEntity();
    toEntity(createDictionaryDto, dictionaryEntity);
    dictionaryEntity.createTime = new Date();
    await this.dictionaryRepository.insert(dictionaryEntity);
  }

  /**
   * 修改字典
   * @param id 主键
   * @param updateDictionaryDto 修改字典dto
   */
  async updateDictionaryById(
    id: number,
    updateDictionaryDto: UpdateDictionaryDto
  ) {
    const dictionary = await this.getDictionaryById(id);
    if (!dictionary) {
      throw new HttpException(
        "操作失败,未找到字典信息.",
        HttpStatus.BAD_REQUEST
      );
    }
    const dictionaryEntity = new DictionaryEntity();
    toEntity(updateDictionaryDto, dictionaryEntity);
    await this.dictionaryRepository.update(id, dictionaryEntity);
  }

  /**
   * 删除字典
   * @param id 主键
   */
  async removeDictionaryById(id: number) {
    await this.dictionaryRepository.delete(id);
  }
}
