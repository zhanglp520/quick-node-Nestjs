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
  ClassSerializerInterceptor,
  UseInterceptors,
} from "@nestjs/common";
import { DeviceService } from "./device.service";
import { CreateDeviceDto } from "./dto/create-device.dto";
import { UpdateDeviceDto } from "./dto/update-device.dto";
import { SearchDeviceDto } from "./dto/search-device.dto";
import { SearchAttributeDto } from "./dto/search-attribute.dto";
import {
  ApiBody,
  ApiOkResponse,
  ApiOperation,
  ApiParam,
  ApiQuery,
  ApiResponse,
  ApiTags,
} from "@nestjs/swagger";
import { DeviceVo } from "./vo/device.vo";
import { ResponseResult } from "@/common/tools/response.result";
import { Role } from "@/common/enums/role.enum";
import { Roles } from "@/common/decorators/roles.decorator";

@ApiTags("设备管理")
@Controller("/device/devices")
export class DeviceController {
  constructor(private readonly deviceService: DeviceService) {}

  @ApiOperation({ summary: "分页列表" })
  @ApiQuery({ name: "productType", description: "产品分类", required: false })
  @ApiQuery({ name: "keyword", description: "关键字", required: false })
  @ApiQuery({ name: "current", description: "当前页码", required: true })
  @ApiQuery({ name: "size", description: "每页条数", required: true })
  @ApiOkResponse({
    status: 200,
    description: "操作成功",
    type: DeviceVo,
  })
  @UseInterceptors(ClassSerializerInterceptor)
  @Get()
  getPageList(
    @Query("productId") productId,
    @Query("keyword") keyword,
    @Query("current") current,
    @Query("size") size
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

  @ApiOperation({ summary: "列表" })
  @ApiOkResponse({
    status: 200,
    description: "操作成功",
    type: DeviceVo,
  })
  @Get("getDeviceList")
  async getDeviceList(@Query("productId") productId) {
    const list = await this.deviceService.getDeviceList(productId);
    return list;
  }

  @Get("getDeviceCount")
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
  @Get("getAttributePageList")
  getAttributePageList(
    @Query("deviceId") deviceId,
    @Query("identifying") identifying,
    @Query("keyword") keyword,
    @Query("current") current,
    @Query("size") size
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
  @Get("getFunctionPageList")
  getFunctionPageList(
    @Query("deviceId") deviceId,
    @Query("identifying") identifying,
    @Query("keyword") keyword,
    @Query("current") current,
    @Query("size") size
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
  @Get("getEventPageList")
  getEventPageList(
    @Query("deviceId") deviceId,
    @Query("identifying") identifying,
    @Query("keyword") keyword,
    @Query("current") current,
    @Query("size") size
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
  @Get("getAttribute")
  getAttribute(@Query("deviceId") deviceId, @Query("identifying") identifying) {
    const searchAttributeDto = new SearchAttributeDto();
    searchAttributeDto.deviceId = deviceId;
    searchAttributeDto.identifying = identifying;
    return this.deviceService.getAttribute(searchAttributeDto);
  }

  @ApiOperation({ summary: "详情" })
  @ApiParam({ name: "id", type: String, description: "主键", required: true })
  @ApiOkResponse({
    status: 200,
    description: "操作成功",
    type: DeviceVo,
  })
  @Get(":id")
  getDeviceById(@Param("id") id: string) {
    return this.deviceService.getDeviceById(+id);
  }

  @ApiOperation({ summary: "根据设备名称获取详情" })
  @ApiParam({
    name: "deviceName",
    type: String,
    description: "设备名称",
    required: true,
  })
  @ApiOkResponse({
    status: 200,
    description: "操作成功",
    type: DeviceVo,
  })
  @Get("getDeviceByDeviceName/:deviceName")
  getDeviceByDeviceName(@Param("deviceName") deviceName: string) {
    return this.deviceService.getDeviceByDeviceName(deviceName);
  }

  @ApiOperation({ summary: "创建" })
  @ApiBody({ type: CreateDeviceDto, description: "创建设备参数" })
  @ApiResponse({
    status: 0,
    description: "请求成功",
    type: ResponseResult,
  })
  @ApiResponse({
    status: 201,
    description: "参数错误",
    type: ResponseResult,
  })
  @ApiResponse({
    status: 1,
    description: "操作失败",
    type: ResponseResult,
  })
  @ApiResponse({
    status: 2,
    description: "系统异常",
    type: ResponseResult,
  })
  @Post()
  createDevice(@Body() createDeviceDto: CreateDeviceDto) {
    return this.deviceService.createDevice(createDeviceDto);
  }

  @ApiOperation({ summary: "修改" })
  @ApiParam({ name: "id", type: String, description: "主键", required: true })
  @ApiBody({ type: UpdateDeviceDto, description: "修改设备参数" })
  @ApiOkResponse({
    status: 200,
    description: "操作成功",
    type: ResponseResult,
  })
  @Put(":id")
  updateDeviceById(
    @Param("id") id: string,
    @Body() updateDeviceDto: UpdateDeviceDto
  ) {
    return this.deviceService.updateDeviceById(+id, updateDeviceDto);
  }

  @ApiOperation({ summary: "删除" })
  @ApiParam({ name: "id", type: String, description: "主键", required: true })
  @ApiOkResponse({
    status: 200,
    description: "操作成功",
    type: ResponseResult,
  })
  @Roles(Role.administrator)
  @Delete(":id")
  removeDeviceById(@Param("id") id: string) {
    return this.deviceService.removeDeviceById(+id);
  }

  @ApiOperation({ summary: "启用" })
  @ApiParam({
    name: "id",
    type: String,
    description: "主键",
    required: true,
  })
  @ApiOkResponse({
    status: 200,
    description: "操作成功",
    type: ResponseResult,
  })
  @Patch("enabled/:id")
  enabled(@Param("id") id: string) {
    return this.deviceService.enabledDeviceById(+id);
  }

  @ApiOperation({ summary: "禁用" })
  @ApiParam({
    name: "id",
    type: String,
    description: "主键",
    required: true,
  })
  @ApiOkResponse({
    status: 200,
    description: "操作成功",
    type: ResponseResult,
  })
  @Patch("disable/:id")
  disable(@Param("id") id: string) {
    return this.deviceService.disableDeviceById(+id);
  }
}
