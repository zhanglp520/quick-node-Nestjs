import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { toEntity } from "src/utils/dto2Entity";
import { Repository } from "typeorm";
import { CreateDictionaryDto } from "./dto/create-dictionary.dto";
import { SearchDictionaryDto } from "./dto/search-dictionary.dto";
import { UpdateDictionaryDto } from "./dto/update-dictionary.dto";
import { DictionaryEntity } from "./entities/dictionary.entity";
import { ResponseResult } from "@/common/tools/response.result";
import { ResponseStatus } from "@/common/enums/response-status.enum";
import { PageResponseResult } from "@/common/tools/page.response.result";

@Injectable()
export class DictionaryService {
  @InjectRepository(DictionaryEntity)
  private readonly dictionaryRepository: Repository<DictionaryEntity>;

  /**
   * 获取字典分页列表
   * @param searchDictionaryDto 搜索dto
   * @returns Promise<PageResponseResult<DictionaryEntity[]>>
   */
  async getDictionaryPageList(
    searchDictionaryDto: SearchDictionaryDto
  ): Promise<PageResponseResult<DictionaryEntity[]>> {
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
      ResponseStatus.success,
      "操作成功",
      page.total,
      entities
    );
    return result;
  }

  /**
   * 获取字典列表
   * @returns Promise<ResponseResult<DictionaryEntity[]>>
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
    const result = new ResponseResult<DictionaryEntity[]>(
      ResponseStatus.success,
      "操作成功",
      entities
    );
    return result;
  }

  /**
   * 根据字典id获取字典信息
   * @param id 主键
   * @returns
   */
  async getDictionaryById(id: number) {
    const entity = await this.dictionaryRepository.findOne({
      where: {
        id,
      },
    });
    const result = new ResponseResult(
      ResponseStatus.success,
      "操作成功",
      entity
    );
    return result;
  }

  /**
   * 根据字典名称获取字典信息
   * @param dicName 字典名称
   * @returns
   */
  async getDictionaryByDictionaryName(
    dicName: string
  ): Promise<ResponseResult<DictionaryEntity>> {
    const entity = await this.dictionaryRepository.findOneBy({
      dicName,
    });
    const result = new ResponseResult(
      ResponseStatus.success,
      "操作成功",
      entity
    );
    return result;
  }

  /**
   * 创建字典
   * @param createDictionaryDto 创建字典dto
   * @returns  Promise<ResponseResult>
   */
  async createDictionary(
    createDictionaryDto: CreateDictionaryDto
  ): Promise<ResponseResult> {
    const dictionary = await this.dictionaryRepository.findOneBy({
      dicName: createDictionaryDto.dicName,
    });
    if (dictionary) {
      throw new HttpException("操作失败,字典名已使用.", HttpStatus.BAD_REQUEST);
    }
    const dictionaryEntity = new DictionaryEntity();
    toEntity(createDictionaryDto, dictionaryEntity);
    await this.dictionaryRepository.insert(dictionaryEntity);
    const result = new ResponseResult(ResponseStatus.success, "操作成功");
    return result;
  }

  /**
   * 修改字典
   * @param id 主键
   * @param updateDictionaryDto 修改字典dto
   * @returns Promise<ResponseResult>
   */
  async updateDictionaryById(
    id: number,
    updateDictionaryDto: UpdateDictionaryDto
  ): Promise<ResponseResult> {
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
    const result = new ResponseResult(ResponseStatus.success, "操作成功");
    return result;
  }

  /**
   * 删除字典
   * @param id 主键
   * @returns  Promise<ResponseResult>
   */
  async removeDictionaryById(id: number): Promise<ResponseResult> {
    await this.dictionaryRepository.delete(id);
    const result = new ResponseResult(ResponseStatus.success, "操作成功");
    return result;
  }
}
