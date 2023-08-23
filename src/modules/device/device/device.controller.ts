import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  Query,
  Put,
  Patch,
} from '@nestjs/common';
import { DeviceService } from './device.service';
import { CreateDeviceDto } from './dto/create-device.dto';
import { UpdateDeviceDto } from './dto/update-device.dto';
import { SearchDeviceDto } from './dto/search-device.dto';
import { SearchAttributeDto } from './dto/search-attribute.dto';

@Controller('/device/devices')
export class DeviceController {
  constructor(private readonly deviceService: DeviceService) {}

  @Get()
  getPageList(
    @Query('productId') productId,
    @Query('keyword') keyword,
    @Query('current') current,
    @Query('size') size
  ) {
    const searchDeviceDto = new SearchDeviceDto();
    searchDeviceDto.productId = productId;
    searchDeviceDto.keyword = keyword;
    searchDeviceDto.page = {
      current,
      size,
    };
    return this.deviceService.getDevicePageList(searchDeviceDto);
  }

  @Get('getDeviceList')
  async getDeviceList(@Query('productId') productId) {
    const list = await this.deviceService.getDeviceList(productId);
    return list;
  }

  @Get('getDeviceCount')
  async getDeviceCount() {
    const list = await this.deviceService.getDeviceList();
    const onlineList = list.filter((x) => x.status === true);
    const offlineList = list.filter((x) => x.status === false);
    const result = {
      count: list.length,
      onlineCount: onlineList.length,
      offlineCount: offlineList.length,
    };
    return result;
  }
  @Get('getAttributePageList')
  getAttributePageList(
    @Query('deviceId') deviceId,
    @Query('identifying') identifying,
    @Query('keyword') keyword,
    @Query('current') current,
    @Query('size') size
  ) {
    const searchAttributeDto = new SearchAttributeDto();
    searchAttributeDto.deviceId = deviceId;
    searchAttributeDto.identifying = identifying;
    searchAttributeDto.keyword = keyword;
    searchAttributeDto.page = {
      current,
      size,
    };
    return this.deviceService.getAttributePageList(searchAttributeDto);
  }
  @Get('getFunctionPageList')
  getFunctionPageList(
    @Query('deviceId') deviceId,
    @Query('identifying') identifying,
    @Query('keyword') keyword,
    @Query('current') current,
    @Query('size') size
  ) {
    const searchAttributeDto = new SearchAttributeDto();
    searchAttributeDto.deviceId = deviceId;
    searchAttributeDto.identifying = identifying;
    searchAttributeDto.keyword = keyword;
    searchAttributeDto.page = {
      current,
      size,
    };
    return this.deviceService.getFunctionPageList(searchAttributeDto);
  }
  @Get('getEventPageList')
  getEventPageList(
    @Query('deviceId') deviceId,
    @Query('identifying') identifying,
    @Query('keyword') keyword,
    @Query('current') current,
    @Query('size') size
  ) {
    const searchAttributeDto = new SearchAttributeDto();
    searchAttributeDto.deviceId = deviceId;
    searchAttributeDto.identifying = identifying;
    searchAttributeDto.keyword = keyword;
    searchAttributeDto.page = {
      current,
      size,
    };
    return this.deviceService.getEventPageList(searchAttributeDto);
  }
  @Get('getAttribute')
  getAttribute(@Query('deviceId') deviceId, @Query('identifying') identifying) {
    const searchAttributeDto = new SearchAttributeDto();
    searchAttributeDto.deviceId = deviceId;
    searchAttributeDto.identifying = identifying;
    return this.deviceService.getAttribute(searchAttributeDto);
  }

  @Get(':id')
  getDeviceById(@Param('id') id: string) {
    return this.deviceService.getDeviceById(+id);
  }

  @Get('getDeviceByDeviceName/:deviceName')
  getDeviceByDeviceName(@Param('deviceName') deviceName: string) {
    return this.deviceService.getDeviceByDeviceName(deviceName);
  }

  @Post()
  createDevice(@Body() createDeviceDto: CreateDeviceDto) {
    return this.deviceService.createDevice(createDeviceDto);
  }

  @Put(':id')
  updateDeviceById(
    @Param('id') id: string,
    @Body() updateDeviceDto: UpdateDeviceDto
  ) {
    return this.deviceService.updateDeviceById(+id, updateDeviceDto);
  }

  @Delete(':id')
  removeDeviceById(@Param('id') id: string) {
    return this.deviceService.removeDeviceById(+id);
  }
  @Patch('enabled/:id')
  enabled(@Param('id') id: string) {
    return this.deviceService.enabledDeviceById(+id);
  }
  @Patch('disable/:id')
  disable(@Param('id') id: string) {
    return this.deviceService.disableDeviceById(+id);
  }
}
