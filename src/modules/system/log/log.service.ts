import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { CreateLogDto } from "./dto/create-log.dto";
import { SearchLogDto } from "./dto/search-log.dto";
import { LogEntity } from "./entities/log.entity";
import { toEntity } from "src/utils/dto2Entity";
import { logOpts } from "../../../config/orm.config";
import { ResponseResult } from "@/common/tools/response.result";
import { ResponseStatus } from "@/common/enums/response-status.enum";
import { PageResponseResult } from "@/common/tools/page.response.result";

@Injectable()
export class LogService {
  @InjectRepository(LogEntity, logOpts.database.toString()) //指定日志数据库连接名称来切换数据库
  private readonly logRepository: Repository<LogEntity>;

  /**
   * 获取日志分页列表
   * @param searchUserDto 搜索dto
   * @returns Promise<PageResponseResult<LogEntity[]>>
   */
  async getLogPageList(
    searchLogDto: SearchLogDto
  ): Promise<PageResponseResult<LogEntity[]>> {
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
    const entities = await queryBuilder
      .orderBy("create_time", "DESC")
      .offset(skip)
      .limit(size)
      .getMany();
    page.total = await queryBuilder.getCount();
    const result = new PageResponseResult<LogEntity[]>(
      ResponseStatus.success,
      "操作成功",
      page.total,
      entities
    );
    return result;
  }

  /**
   * 根据日志id获取日志信息
   * @param id 主键
   * @returns Promise<ResponseResult<LogEntity>>
   */
  async getLogById(id: number): Promise<ResponseResult<LogEntity>> {
    const entity = await this.logRepository.findOne({
      where: {
        id,
      },
    });
    const result = new ResponseResult<LogEntity>(
      ResponseStatus.success,
      "操作成功",
      entity
    );
    return result;
  }

  /**
   * 创建日志
   * @param createUserDto 创建日志dto
   * @returns  Promise<ResponseResult>
   */
  async createLog(createLogDto: CreateLogDto): Promise<ResponseResult> {
    createLogDto.createTime = new Date();
    const logEntity = new LogEntity();
    toEntity(createLogDto, logEntity);
    await this.logRepository.insert(logEntity);
    const result = new ResponseResult(ResponseStatus.success, "操作成功");
    return result;
  }

  /**
   * 删除日志
   * @param id 主键
   * @returns  Promise<ResponseResult>
   */
  async removeLogById(id: number): Promise<ResponseResult> {
    await this.logRepository.delete(id);
    const result = new ResponseResult<LogEntity>(
      ResponseStatus.success,
      "操作成功"
    );
    return result;
  }
}
