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
import { PhysicalModelService } from './physical-model.service';
import { CreatePhysicalModelDto } from './dto/create-physical-model.dto';
import { UpdatePhysicalModelDto } from './dto/update-physical-model.dto';
import { SearchPhysicalModelDto } from './dto/search-physical-model.dto';
import { AddAttribute } from './dto/add-attribute.dto';
import { AddFunction } from './dto/add-function.dto';
import { AddEvent } from './dto/add-event.dto';

@Controller('/device/physicalModels')
export class PhysicalModelController {
  constructor(private readonly physicalModelService: PhysicalModelService) {}

  @Get()
  getPageList(
    @Query('keyword') keyword,
    @Query('current') current,
    @Query('size') size
  ) {
    const searchPhysicalModelDto = new SearchPhysicalModelDto();
    searchPhysicalModelDto.keyword = keyword;
    searchPhysicalModelDto.page = {
      current,
      size,
    };
    return this.physicalModelService.getPhysicalModelPageList(
      searchPhysicalModelDto
    );
  }

  @Get('getPhysicalModelList')
  async getPhysicalModelList() {
    const list = await this.physicalModelService.getPhysicalModelList();
    return list;
  }

  @Get(':id')
  getPhysicalModelById(@Param('id') id: string) {
    return this.physicalModelService.getPhysicalModelById(+id);
  }

  @Get('getPhysicalModelByProductId/:productId')
  getPhysicalModelByProductId(@Param('productId') productId: number) {
    return this.physicalModelService.getPhysicalModelByProductId(productId);
  }

  @Post()
  createPhysicalModel(@Body() createPhysicalModelDto: CreatePhysicalModelDto) {
    return this.physicalModelService.createPhysicalModel(
      createPhysicalModelDto
    );
  }

  @Put(':id')
  updatePhysicalModelById(
    @Param('id') id: string,
    @Body() updatePhysicalModelDto: UpdatePhysicalModelDto
  ) {
    return this.physicalModelService.updatePhysicalModelById(
      +id,
      updatePhysicalModelDto
    );
  }

  @Delete(':id')
  removePhysicalModelById(@Param('id') id: string) {
    return this.physicalModelService.removePhysicalModelById(+id);
  }

  //#region 属性
  @Get('getAttributeList/:productId')
  getAttributeList(@Param('productId') productId: number) {
    return this.physicalModelService.getAttributeList(productId);
  }

  @Get('getAttributeDetail/:productId/:identifying')
  getAttributeDetail(
    @Param('productId') productId: number,
    @Param('identifying') identifying: string
  ) {
    return this.physicalModelService.getAttributeDetail(productId, identifying);
  }

  @Put('addAttribute/:productId')
  addAttribute(
    @Param('productId') productId: number,
    @Body() addAttribute: AddAttribute
  ) {
    return this.physicalModelService.addAttribute(productId, addAttribute);
  }
  @Delete('deleteAttribute/:productId/:identifying')
  deleteAttribute(
    @Param('productId') productId: number,
    @Param('identifying') identifying: string
  ) {
    return this.physicalModelService.deleteAttribute(productId, identifying);
  }

  //#endregion

  //#region  功能
  @Get('getFunctionList/:productId')
  getFunctionList(@Param('productId') productId: number) {
    return this.physicalModelService.getFunctionList(productId);
  }
  @Get('getFunctionDetail/:productId/:identifying')
  getFunctionDetail(
    @Param('productId') productId: number,
    @Param('identifying') identifying: string
  ) {
    return this.physicalModelService.getFunctionDetail(productId, identifying);
  }

  @Put('addFunction/:productId')
  addFunction(
    @Param('productId') productId: number,
    @Body() addFunction: AddFunction
  ) {
    return this.physicalModelService.addFunction(productId, addFunction);
  }
  @Delete('deleteFunction/:productId/:identifying')
  deleteFunction(
    @Param('productId') productId: number,
    @Param('identifying') identifying: string
  ) {
    return this.physicalModelService.deleteFunction(productId, identifying);
  }
  //#endregion

  //#region 事件
  @Get('getEventList/:productId')
  getEventList(@Param('productId') productId: number) {
    return this.physicalModelService.getEventList(productId);
  }
  @Get('getEventDetail/:productId/:identifying')
  getEventDetail(
    @Param('productId') productId: number,
    @Param('identifying') identifying: string
  ) {
    return this.physicalModelService.getEventDetail(productId, identifying);
  }

  @Put('addEvent/:productId')
  addEvent(@Param('productId') productId: number, @Body() addEvent: AddEvent) {
    return this.physicalModelService.addEvent(productId, addEvent);
  }
  @Delete('deleteEvent/:productId/:identifying')
  deleteEvent(
    @Param('productId') productId: number,
    @Param('identifying') identifying: string
  ) {
    return this.physicalModelService.deleteEvent(productId, identifying);
  }
  //#endregion
}
