import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { toEntity } from "src/utils/dto2Entity";
import { Repository } from "typeorm";
import { CreateNoticeConfigDto } from "./dto/create-notice-config.dto";
import { SearchNoticeConfigDto } from "./dto/search-notice-config.dto";
import { UpdateNoticeConfigDto } from "./dto/update-notice-config.dto";
import { NoticeConfigEntity } from "./entities/notice-config.entity";

@Injectable()
export class NoticeConfigService {
  @InjectRepository(NoticeConfigEntity)
  private readonly noticeConfigRepository: Repository<NoticeConfigEntity>;

  async getNoticeConfigPageList(searchNoticeConfigDto: SearchNoticeConfigDto) {
    const { page, keyword } = searchNoticeConfigDto;
    const { current, size } = page;
    const skip = (current - 1) * size;
    const queryBuilder = this.noticeConfigRepository.createQueryBuilder();
    if (keyword) {
      queryBuilder.where(`notice_config_name=:noticeConfigName`, {
        noticeConfigName: keyword,
      });
      queryBuilder.orWhere(`phone=:phone`, { phone: keyword });
    }
    const list = await queryBuilder
      .orderBy("create_time", "DESC")
      .offset(skip)
      .limit(size)
      .getMany();
    page.total = await this.noticeConfigRepository.count();
    return {
      payload: list,
      total: page.total,
    };
  }

  getNoticeConfigList() {
    return this.noticeConfigRepository.find();
  }

  getNoticeConfigById(id: number) {
    return this.noticeConfigRepository.findOne({
      where: {
        id,
      },
    });
  }

  getNoticeConfigByNoticeConfigName(configName: string) {
    return this.noticeConfigRepository.findOneBy({
      configName,
    });
  }

  async createNoticeConfig(createNoticeConfigDto: CreateNoticeConfigDto) {
    const noticeConfig = await this.noticeConfigRepository.findOneBy({
      configName: createNoticeConfigDto.configName,
    });
    if (noticeConfig) {
      throw new HttpException(
        "操作失败,通知配置名已使用.",
        HttpStatus.BAD_REQUEST
      );
    }
    const noticeConfigEntity = new NoticeConfigEntity();
    toEntity(createNoticeConfigDto, noticeConfigEntity);
    await this.noticeConfigRepository.insert(noticeConfigEntity);
  }

  async updateNoticeConfigById(
    id: number,
    updateNoticeConfigDto: UpdateNoticeConfigDto
  ) {
    const noticeConfig = await this.getNoticeConfigById(id);
    if (!noticeConfig) {
      throw new HttpException(
        "操作失败,未找到通知配置信息.",
        HttpStatus.BAD_REQUEST
      );
    }
    const noticeConfigEntity = new NoticeConfigEntity();
    toEntity(updateNoticeConfigDto, noticeConfigEntity);
    await this.noticeConfigRepository.update(id, noticeConfigEntity);
  }

  async removeNoticeConfigById(id: number) {
    await this.noticeConfigRepository.delete(id);
  }
}
