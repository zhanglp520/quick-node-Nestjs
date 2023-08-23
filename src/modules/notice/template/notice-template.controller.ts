import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  Query,
  Put,
} from "@nestjs/common";
import { NoticeTemplateService } from "./notice-template.service";
import { CreateNoticeTemplateDto } from "./dto/create-notice-template.dto";
import { UpdateNoticeTemplateDto } from "./dto/update-notice-template.dto";
import { SearchNoticeTemplateDto } from "./dto/search-notice-template.dto";

@Controller("/notice/templates")
export class NoticeTemplateController {
  constructor(private readonly noticeTemplateService: NoticeTemplateService) {}

  @Get("getPageList")
  getPageList(
    @Query("keyword") keyword,
    @Query("current") current,
    @Query("size") size
  ) {
    const searchNoticeTemplateDto = new SearchNoticeTemplateDto();
    searchNoticeTemplateDto.keyword = keyword;
    searchNoticeTemplateDto.page = {
      current,
      size,
    };
    searchNoticeTemplateDto.keyword = keyword;
    return this.noticeTemplateService.getNoticeTemplatePageList(
      searchNoticeTemplateDto
    );
  }

  @Get()
  async getNoticeTemplateList() {
    const list = await this.noticeTemplateService.getNoticeTemplateList();
    return list;
  }

  @Get(":id")
  getNoticeTemplateById(@Param("id") id: string) {
    return this.noticeTemplateService.getNoticeTemplateById(+id);
  }

  @Get("getNoticeTemplateByNoticeTemplateName/:notice-templateName")
  getNoticeTemplateByNoticeTemplateName(
    @Param("notice-templateName") noticeTemplateName: string
  ) {
    return this.noticeTemplateService.getNoticeTemplateByNoticeTemplateName(
      noticeTemplateName
    );
  }

  @Post()
  createNoticeTemplate(
    @Body() createNoticeTemplateDto: CreateNoticeTemplateDto
  ) {
    return this.noticeTemplateService.createNoticeTemplate(
      createNoticeTemplateDto
    );
  }

  @Put(":id")
  updateNoticeTemplateById(
    @Param("id") id: string,
    @Body() updateNoticeTemplateDto: UpdateNoticeTemplateDto
  ) {
    return this.noticeTemplateService.updateNoticeTemplateById(
      +id,
      updateNoticeTemplateDto
    );
  }

  @Delete(":id")
  removeNoticeTemplateById(@Param("id") id: string) {
    return this.noticeTemplateService.removeNoticeTemplateById(+id);
  }
}
