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
import { AlarmConfigService } from './alarm-config.service';
import { CreateAlarmConfigDto } from './dto/create-alarm-config.dto';
import { UpdateAlarmConfigDto } from './dto/update-alarm-config.dto';
import { SearchAlarmConfigDto } from './dto/search-alarm-config.dto';

@Controller('/alarm/configs')
export class AlarmConfigController {
  constructor(private readonly alarmConfigService: AlarmConfigService) {}

  @Get('getPageList')
  getPageList(
    @Query('keyword') keyword,
    @Query('current') current,
    @Query('size') size
  ) {
    const searchAlarmConfigDto = new SearchAlarmConfigDto();
    searchAlarmConfigDto.keyword = keyword;
    searchAlarmConfigDto.page = {
      current,
      size,
    };
    searchAlarmConfigDto.keyword = keyword;
    return this.alarmConfigService.getAlarmConfigPageList(searchAlarmConfigDto);
  }

  @Get()
  async getAlarmConfigList() {
    const list = await this.alarmConfigService.getAlarmConfigList();
    return list;
  }

  @Get(':id')
  getAlarmConfigById(@Param('id') id: string) {
    return this.alarmConfigService.getAlarmConfigById(+id);
  }

  @Get('getAlarmConfigByAlarmConfigName/:alarmConfigName')
  getAlarmConfigByAlarmConfigName(
    @Param('alarmConfigName') alarmConfigName: string
  ) {
    return this.alarmConfigService.getAlarmConfigByAlarmConfigName(
      alarmConfigName
    );
  }

  @Post()
  createAlarmConfig(@Body() createAlarmConfigDto: CreateAlarmConfigDto) {
    return this.alarmConfigService.createAlarmConfig(createAlarmConfigDto);
  }

  @Put(':id')
  updateAlarmConfigById(
    @Param('id') id: string,
    @Body() updateAlarmConfigDto: UpdateAlarmConfigDto
  ) {
    return this.alarmConfigService.updateAlarmConfigById(
      +id,
      updateAlarmConfigDto
    );
  }

  @Delete(':id')
  removeAlarmConfigById(@Param('id') id: string) {
    return this.alarmConfigService.removeAlarmConfigById(+id);
  }
}
