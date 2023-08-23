import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { toEntity } from 'src/utils/dto2Entity';
import { Repository } from 'typeorm';
import { CreateNoticeTemplateDto } from './dto/create-notice-template.dto';
import { SearchNoticeTemplateDto } from './dto/search-notice-template.dto';
import { UpdateNoticeTemplateDto } from './dto/update-notice-template.dto';
import { NoticeTemplateEntity } from './entities/notice-template.entity';

@Injectable()
export class NoticeTemplateService {
  @InjectRepository(NoticeTemplateEntity)
  private readonly noticeTemplateRepository: Repository<NoticeTemplateEntity>;

  async getNoticeTemplatePageList(
    searchNoticeTemplateDto: SearchNoticeTemplateDto
  ) {
    const { page, keyword } = searchNoticeTemplateDto;
    const { current, size } = page;
    const skip = (current - 1) * size;
    const queryBuilder = this.noticeTemplateRepository.createQueryBuilder();
    if (keyword) {
      queryBuilder.where(`notice_template_name=:noticeTemplateName`, {
        noticeTemplateName: keyword,
      });
      queryBuilder.orWhere(`phone=:phone`, { phone: keyword });
    }
    const list = await queryBuilder
      .orderBy('create_time', 'DESC')
      .offset(skip)
      .limit(size)
      .getMany();
    page.total = await this.noticeTemplateRepository.count();
    return {
      payload: list,
      total: page.total,
    };
  }

  getNoticeTemplateList() {
    return this.noticeTemplateRepository.find();
  }

  getNoticeTemplateById(id: number) {
    return this.noticeTemplateRepository.findOne({
      where: {
        id,
      },
    });
  }

  getNoticeTemplateByNoticeTemplateName(templateName: string) {
    return this.noticeTemplateRepository.findOneBy({
      templateName,
    });
  }

  async createNoticeTemplate(createNoticeTemplateDto: CreateNoticeTemplateDto) {
    const noticeTemplate = await this.noticeTemplateRepository.findOneBy({
      templateName: createNoticeTemplateDto.templateName,
    });
    if (noticeTemplate) {
      throw new HttpException(
        '操作失败,通知模板名已使用.',
        HttpStatus.BAD_REQUEST
      );
    }
    const noticeTemplateEntity = new NoticeTemplateEntity();
    toEntity(createNoticeTemplateDto, noticeTemplateEntity);
    await this.noticeTemplateRepository.insert(noticeTemplateEntity);
  }

  async updateNoticeTemplateById(
    id: number,
    updateNoticeTemplateDto: UpdateNoticeTemplateDto
  ) {
    const noticeTemplate = await this.getNoticeTemplateById(id);
    if (!noticeTemplate) {
      throw new HttpException(
        '操作失败,未找到通知模板信息.',
        HttpStatus.BAD_REQUEST
      );
    }
    const noticeTemplateEntity = new NoticeTemplateEntity();
    toEntity(updateNoticeTemplateDto, noticeTemplateEntity);
    await this.noticeTemplateRepository.update(id, noticeTemplateEntity);
  }

  async removeNoticeTemplateById(id: number) {
    await this.noticeTemplateRepository.delete(id);
  }
}
