import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { toEntity } from "src/utils/dto2Entity";
import { Repository } from "typeorm";
import { CreateDictionaryTypeDto } from "./dto/create-dictionary-type.dto";
import { SearchDictionaryTypeDto } from "./dto/search-dictionary-type.dto";
import { UpdateDictionaryTypeDto } from "./dto/update-dictionary-type.dto";
import { DictionaryTypeEntity } from "./entities/dictionary-type.entity";

@Injectable()
export class DictionaryTypeService {
  @InjectRepository(DictionaryTypeEntity)
  private readonly dictionaryTypeRepository: Repository<DictionaryTypeEntity>;

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
    const list = await queryBuilder
      .orderBy("create_time", "DESC")
      .offset(skip)
      .limit(size)
      .getMany();
    page.total = await this.dictionaryTypeRepository.count();
    return {
      payload: list,
      total: page.total,
    };
  }

  getDictionaryTypeList() {
    return this.dictionaryTypeRepository.find();
  }

  getDictionaryTypeById(id: number) {
    return this.dictionaryTypeRepository.findOne({
      where: {
        id,
      },
    });
  }

  getDictionaryTypeByDictionaryTypeName(dicTypeName: string) {
    return this.dictionaryTypeRepository.findOneBy({
      dicTypeName,
    });
  }

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

  async removeDictionaryTypeById(id: number) {
    await this.dictionaryTypeRepository.delete(id);
  }
}
