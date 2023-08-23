import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { toEntity } from 'src/utils/dto2Entity';
import { Repository } from 'typeorm';
import { CreateAlarmRecordDto } from './dto/create-alarm-record.dto';
import { SearchAlarmRecordDto } from './dto/search-alarm-record.dto';
import { UpdateAlarmRecordDto } from './dto/update-alarm-record.dto';
import { AlarmRecordEntity } from './entities/alarm-record.entity';

@Injectable()
export class AlarmRecordService {
  @InjectRepository(AlarmRecordEntity)
  private readonly alarmRecordRepository: Repository<AlarmRecordEntity>;

  async getAlarmRecordPageList(searchAlarmRecordDto: SearchAlarmRecordDto) {
    const { page, keyword } = searchAlarmRecordDto;
    const { current, size } = page;
    const skip = (current - 1) * size;
    const queryBuilder = this.alarmRecordRepository.createQueryBuilder();
    if (keyword) {
      queryBuilder.where(`alarm_record_name=:alarmRecordName`, {
        alarmRecordName: keyword,
      });
      queryBuilder.orWhere(`phone=:phone`, { phone: keyword });
    }
    const list = await queryBuilder
      .orderBy('create_time', 'DESC')
      .offset(skip)
      .limit(size)
      .getMany();
    page.total = await this.alarmRecordRepository.count();
    return {
      payload: list,
      total: page.total,
    };
  }

  getAlarmRecordList() {
    return this.alarmRecordRepository.find();
  }

  getAlarmRecordById(id: number) {
    return this.alarmRecordRepository.findOne({
      where: {
        id,
      },
    });
  }

  getAlarmRecordByAlarmRecordName(recordName: string) {
    return this.alarmRecordRepository.findOneBy({
      recordName,
    });
  }

  async createAlarmRecord(createAlarmRecordDto: CreateAlarmRecordDto) {
    const alarmRecord = await this.alarmRecordRepository.findOneBy({
      recordName: createAlarmRecordDto.recordName,
    });
    if (alarmRecord) {
      throw new HttpException('操作失败,角色名已使用.', HttpStatus.BAD_REQUEST);
    }
    const alarmRecordEntity = new AlarmRecordEntity();
    toEntity(createAlarmRecordDto, alarmRecordEntity);
    await this.alarmRecordRepository.insert(alarmRecordEntity);
  }

  async updateAlarmRecordById(
    id: number,
    updateAlarmRecordDto: UpdateAlarmRecordDto
  ) {
    const alarmRecord = await this.getAlarmRecordById(id);
    if (!alarmRecord) {
      throw new HttpException(
        '操作失败,未找到角色信息.',
        HttpStatus.BAD_REQUEST
      );
    }
    const alarmRecordEntity = new AlarmRecordEntity();
    toEntity(updateAlarmRecordDto, alarmRecordEntity);
    await this.alarmRecordRepository.update(id, alarmRecordEntity);
  }

  async removeAlarmRecordById(id: number) {
    await this.alarmRecordRepository.delete(id);
  }
}
