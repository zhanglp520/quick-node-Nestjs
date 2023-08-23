import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  Query,
  Put,
} from '@nestjs/common';
import { NoticeConfigService } from './notice-config.service';
import { CreateNoticeConfigDto } from './dto/create-notice-config.dto';
import { UpdateNoticeConfigDto } from './dto/update-notice-config.dto';
import { SearchNoticeConfigDto } from './dto/search-notice-config.dto';

@Controller('/notice/configs')
export class NoticeConfigController {
  constructor(private readonly noticeConfigService: NoticeConfigService) {}

  @Get('getPageList')
  getPageList(
    @Query('keyword') keyword,
    @Query('current') current,
    @Query('size') size
  ) {
    const searchNoticeConfigDto = new SearchNoticeConfigDto();
    searchNoticeConfigDto.keyword = keyword;
    searchNoticeConfigDto.page = {
      current,
      size,
    };
    searchNoticeConfigDto.keyword = keyword;
    return this.noticeConfigService.getNoticeConfigPageList(
      searchNoticeConfigDto
    );
  }

  @Get()
  async getNoticeConfigList() {
    const list = await this.noticeConfigService.getNoticeConfigList();
    return list;
  }

  @Get(':id')
  getNoticeConfigById(@Param('id') id: string) {
    return this.noticeConfigService.getNoticeConfigById(+id);
  }

  @Get('getNoticeConfigByNoticeConfigName/:noticeConfigName')
  getNoticeConfigByNoticeConfigName(
    @Param('noticeConfigName') noticeConfigName: string
  ) {
    return this.noticeConfigService.getNoticeConfigByNoticeConfigName(
      noticeConfigName
    );
  }

  @Post()
  createNoticeConfig(@Body() createNoticeConfigDto: CreateNoticeConfigDto) {
    return this.noticeConfigService.createNoticeConfig(createNoticeConfigDto);
  }

  @Put(':id')
  updateNoticeConfigById(
    @Param('id') id: string,
    @Body() updateNoticeConfigDto: UpdateNoticeConfigDto
  ) {
    return this.noticeConfigService.updateNoticeConfigById(
      +id,
      updateNoticeConfigDto
    );
  }

  @Delete(':id')
  removeNoticeConfigById(@Param('id') id: string) {
    return this.noticeConfigService.removeNoticeConfigById(+id);
  }
}
