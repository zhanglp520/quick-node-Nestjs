import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { CreateLogDto } from "./dto/create-log.dto";
import { SearchLogDto } from "./dto/search-log.dto";
import { LogEntity } from "./entities/log.entity";
import { toEntity } from "src/utils/dto2Entity";

@Injectable()
export class LogService {
  @InjectRepository(LogEntity, "quick_log_v2") //指定日志数据库连接名称来切换数据库
  private readonly logRepository: Repository<LogEntity>;

  async getLogPageList(searchLogDto: SearchLogDto) {
    const { page, keyword, type, startTime, endTime } = searchLogDto;
    const { current, size } = page;
    const skip = (current - 1) * size;
    const queryBuilder = this.logRepository.createQueryBuilder();
    if (!type) {
      throw new HttpException(
        {
          message: "请求参数错误,未找到type参数.",
        },
        HttpStatus.BAD_REQUEST
      );
    }
    queryBuilder.where(`type=:type`, { type: type });
    if (keyword) {
      queryBuilder.andWhere(`operateId=:operateId`, { operateId: keyword });
      queryBuilder.orWhere(`ip=:ip`, { ip: keyword });
    }
    if (startTime && endTime) {
      queryBuilder.andWhere(`create_time<:startTime`, { startTime: startTime });
      queryBuilder.andWhere(`create_time>:endTime`, { endTime: endTime });
    }
    const list = await queryBuilder
      .orderBy("create_time", "DESC")
      .offset(skip)
      .limit(size)
      .getMany();
    page.total = await this.logRepository.count();
    return {
      payload: list,
      total: page.total,
    };
  }
  getLogById(id: number) {
    return this.logRepository.findOne({
      where: {
        id,
      },
    });
  }
  async createLog(createLogDto: CreateLogDto) {
    createLogDto.createTime = new Date();
    const logEntity = new LogEntity();
    toEntity(createLogDto, logEntity);
    await this.logRepository.insert(logEntity);
  }
  async removeLogById(id: number) {
    await this.logRepository.delete(id);
  }
}
