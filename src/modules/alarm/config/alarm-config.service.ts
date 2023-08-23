import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { toEntity } from 'src/utils/dto2Entity';
import { Repository } from 'typeorm';
import { CreateAlarmConfigDto } from './dto/create-alarm-config.dto';
import { SearchAlarmConfigDto } from './dto/search-alarm-config.dto';
import { UpdateAlarmConfigDto } from './dto/update-alarm-config.dto';
import { AlarmConfigEntity } from './entities/alarm-config.entity';

@Injectable()
export class AlarmConfigService {
  @InjectRepository(AlarmConfigEntity)
  private readonly alarmConfigRepository: Repository<AlarmConfigEntity>;

  async getAlarmConfigPageList(searchAlarmConfigDto: SearchAlarmConfigDto) {
    const { page, keyword } = searchAlarmConfigDto;
    const { current, size } = page;
    const skip = (current - 1) * size;
    const queryBuilder = this.alarmConfigRepository.createQueryBuilder();
    if (keyword) {
      queryBuilder.where(`alarm_config_name=:alarmConfigName`, {
        alarmConfigName: keyword,
      });
      queryBuilder.orWhere(`phone=:phone`, { phone: keyword });
    }
    const list = await queryBuilder
      .orderBy('create_time', 'DESC')
      .offset(skip)
      .limit(size)
      .getMany();
    page.total = await this.alarmConfigRepository.count();
    return {
      payload: list,
      total: page.total,
    };
  }

  getAlarmConfigList() {
    return this.alarmConfigRepository.find();
  }

  getAlarmConfigById(id: number) {
    return this.alarmConfigRepository.findOne({
      where: {
        id,
      },
    });
  }

  getAlarmConfigByAlarmConfigName(configName: string) {
    return this.alarmConfigRepository.findOneBy({
      configName,
    });
  }

  async createAlarmConfig(createAlarmConfigDto: CreateAlarmConfigDto) {
    const alarmConfig = await this.alarmConfigRepository.findOneBy({
      configName: createAlarmConfigDto.configName,
    });
    if (alarmConfig) {
      throw new HttpException('操作失败,角色名已使用.', HttpStatus.BAD_REQUEST);
    }
    const alarmConfigEntity = new AlarmConfigEntity();
    toEntity(createAlarmConfigDto, alarmConfigEntity);
    await this.alarmConfigRepository.insert(alarmConfigEntity);
  }

  async updateAlarmConfigById(
    id: number,
    updateAlarmConfigDto: UpdateAlarmConfigDto
  ) {
    const alarmConfig = await this.getAlarmConfigById(id);
    if (!alarmConfig) {
      throw new HttpException(
        '操作失败,未找到角色信息.',
        HttpStatus.BAD_REQUEST
      );
    }
    const alarmConfigEntity = new AlarmConfigEntity();
    toEntity(updateAlarmConfigDto, alarmConfigEntity);
    await this.alarmConfigRepository.update(id, alarmConfigEntity);
  }

  async removeAlarmConfigById(id: number) {
    await this.alarmConfigRepository.delete(id);
  }
}
