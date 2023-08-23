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
import { AlarmRecordService } from "./alarm-record.service";
import { CreateAlarmRecordDto } from "./dto/create-alarm-record.dto";
import { UpdateAlarmRecordDto } from "./dto/update-alarm-record.dto";
import { SearchAlarmRecordDto } from "./dto/search-alarm-record.dto";

@Controller("/alarm/records")
export class AlarmRecordController {
  constructor(private readonly alarmRecordService: AlarmRecordService) {}

  @Get("getPageList")
  getPageList(
    @Query("keyword") keyword,
    @Query("current") current,
    @Query("size") size
  ) {
    const searchAlarmRecordDto = new SearchAlarmRecordDto();
    searchAlarmRecordDto.keyword = keyword;
    searchAlarmRecordDto.page = {
      current,
      size,
    };
    searchAlarmRecordDto.keyword = keyword;
    return this.alarmRecordService.getAlarmRecordPageList(searchAlarmRecordDto);
  }

  @Get()
  async getAlarmRecordList() {
    const list = await this.alarmRecordService.getAlarmRecordList();
    return list;
  }

  @Get(":id")
  getAlarmRecordById(@Param("id") id: string) {
    return this.alarmRecordService.getAlarmRecordById(+id);
  }

  @Get("getAlarmRecordByAlarmRecordName/:alarmRecordName")
  getAlarmRecordByAlarmRecordName(
    @Param("alarmRecordName") alarmRecordName: string
  ) {
    return this.alarmRecordService.getAlarmRecordByAlarmRecordName(
      alarmRecordName
    );
  }

  @Post()
  createAlarmRecord(@Body() createAlarmRecordDto: CreateAlarmRecordDto) {
    return this.alarmRecordService.createAlarmRecord(createAlarmRecordDto);
  }

  @Put(":id")
  updateAlarmRecordById(
    @Param("id") id: string,
    @Body() updateAlarmRecordDto: UpdateAlarmRecordDto
  ) {
    return this.alarmRecordService.updateAlarmRecordById(
      +id,
      updateAlarmRecordDto
    );
  }

  @Delete(":id")
  removeAlarmRecordById(@Param("id") id: string) {
    return this.alarmRecordService.removeAlarmRecordById(+id);
  }
}
