import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { toEntity } from 'src/utils/dto2Entity';
import { Repository } from 'typeorm';
import { CreateRuleConfigDto } from './dto/create-rule-config.dto';
import { SearchRuleConfigDto } from './dto/search-rule-config.dto';
import { UpdateRuleConfigDto } from './dto/update-rule-config.dto';
import { RuleConfigEntity } from './entities/rule-config.entity';

@Injectable()
export class RuleConfigService {
  @InjectRepository(RuleConfigEntity)
  private readonly ruleConfigRepository: Repository<RuleConfigEntity>;

  async getRuleConfigPageList(searchRuleConfigDto: SearchRuleConfigDto) {
    const { page, keyword } = searchRuleConfigDto;
    const { current, size } = page;
    const skip = (current - 1) * size;
    const queryBuilder = this.ruleConfigRepository.createQueryBuilder();
    if (keyword) {
      queryBuilder.where(`ruleConfig_name=:ruleConfigName`, {
        ruleConfigName: keyword,
      });
      queryBuilder.orWhere(`phone=:phone`, { phone: keyword });
    }
    const list = await queryBuilder
      .orderBy('create_time', 'DESC')
      .offset(skip)
      .limit(size)
      .getMany();
    page.total = await this.ruleConfigRepository.count();
    return {
      payload: list,
      total: page.total,
    };
  }

  getRuleConfigList() {
    return this.ruleConfigRepository.find();
  }

  getRuleConfigById(id: number) {
    return this.ruleConfigRepository.findOne({
      where: {
        id,
      },
    });
  }

  getRuleConfigByRuleConfigName(configName: string) {
    return this.ruleConfigRepository.findOneBy({
      configName,
    });
  }

  async createRuleConfig(createRuleConfigDto: CreateRuleConfigDto) {
    const ruleConfig = await this.ruleConfigRepository.findOneBy({
      configName: createRuleConfigDto.configName,
    });
    if (ruleConfig) {
      throw new HttpException(
        '操作失败,规则配置名已使用.',
        HttpStatus.BAD_REQUEST
      );
    }
    const ruleConfigEntity = new RuleConfigEntity();
    toEntity(createRuleConfigDto, ruleConfigEntity);
    await this.ruleConfigRepository.insert(ruleConfigEntity);
  }

  async updateRuleConfigById(
    id: number,
    updateRuleConfigDto: UpdateRuleConfigDto
  ) {
    const ruleConfig = await this.getRuleConfigById(id);
    if (!ruleConfig) {
      throw new HttpException(
        '操作失败,未找到规则配置信息.',
        HttpStatus.BAD_REQUEST
      );
    }
    const ruleConfigEntity = new RuleConfigEntity();
    toEntity(updateRuleConfigDto, ruleConfigEntity);
    await this.ruleConfigRepository.update(id, ruleConfigEntity);
  }

  async removeRuleConfigById(id: number) {
    await this.ruleConfigRepository.delete(id);
  }
}
