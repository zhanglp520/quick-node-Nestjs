import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { toEntity } from 'src/utils/dto2Entity';
import { Repository } from 'typeorm';
import { CreateDictionaryDto } from './dto/create-dictionary.dto';
import { SearchDictionaryDto } from './dto/search-dictionary.dto';
import { UpdateDictionaryDto } from './dto/update-dictionary.dto';
import { DictionaryEntity } from './entities/dictionary.entity';

@Injectable()
export class DictionaryService {
  @InjectRepository(DictionaryEntity)
  private readonly dictionaryRepository: Repository<DictionaryEntity>;

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
    const list = await queryBuilder
      .orderBy('create_time', 'DESC')
      .offset(skip)
      .limit(size)
      .getMany();
    page.total = await this.dictionaryRepository.count();
    return {
      payload: list,
      total: page.total,
    };
  }

  async getDictionaryListByTypeId(typeId: string) {
    const queryBuilder = this.dictionaryRepository.createQueryBuilder();
    if (!typeId) {
      throw new HttpException(
        {
          message: '请求参数错误,未找到typeId参数.',
        },
        HttpStatus.BAD_REQUEST
      );
    }
    queryBuilder.where(`dic_type_id=:typeId`, {
      typeId,
    });
    const list = await queryBuilder.getMany();
    return list;
  }

  getDictionaryById(id: number) {
    return this.dictionaryRepository.findOne({
      where: {
        id,
      },
    });
  }

  getDictionaryByDictionaryName(dicName: string) {
    return this.dictionaryRepository.findOneBy({
      dicName,
    });
  }

  async createDictionary(createDictionaryDto: CreateDictionaryDto) {
    const dictionary = await this.dictionaryRepository.findOneBy({
      dicName: createDictionaryDto.dicName,
    });
    if (dictionary) {
      throw new HttpException('操作失败,字典名已使用.', HttpStatus.BAD_REQUEST);
    }
    const dictionaryEntity = new DictionaryEntity();
    toEntity(createDictionaryDto, dictionaryEntity);
    await this.dictionaryRepository.insert(dictionaryEntity);
  }

  async updateDictionaryById(
    id: number,
    updateDictionaryDto: UpdateDictionaryDto
  ) {
    const dictionary = await this.getDictionaryById(id);
    if (!dictionary) {
      throw new HttpException(
        '操作失败,未找到字典信息.',
        HttpStatus.BAD_REQUEST
      );
    }
    const dictionaryEntity = new DictionaryEntity();
    toEntity(updateDictionaryDto, dictionaryEntity);
    await this.dictionaryRepository.update(id, dictionaryEntity);
  }

  async removeDictionaryById(id: number) {
    await this.dictionaryRepository.delete(id);
  }
}
