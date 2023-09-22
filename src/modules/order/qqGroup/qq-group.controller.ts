import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  Query,
  Put,
  ClassSerializerInterceptor,
  UseInterceptors,
  Patch,
} from "@nestjs/common";
import { QQGroupService } from "./qq-group.service";
import { CreateQQGroupDto } from "./dto/create-qq-group.dto";
import { UpdateQQGroupDto } from "./dto/update-qq-group.dto";
import { SearchQQGroupDto } from "./dto/search-qq-group.dto";

import {
  ApiBody,
  ApiOkResponse,
  ApiOperation,
  ApiParam,
  ApiQuery,
  ApiResponse,
  ApiTags,
} from "@nestjs/swagger";
import { ResponseResult } from "src/common/tools/response.result";
import { QQGroupPageResult } from "./result/qq-group.page.result";
import { QQGroupListResult } from "./result/qq-group.list.result";
import { QQGroupResult } from "./result/qq-group.result";

@ApiTags("订单管理")
// @UseInterceptors(new RbacInterceptor(Role.Administrator))
@Controller("/order/qqGroups")
export class QQGroupController {
  constructor(private readonly qqGroupService: QQGroupService) {}

  @ApiOperation({ summary: "分页列表" })
  @ApiQuery({ name: "keyword", description: "关键字", required: false })
  @ApiQuery({ name: "current", description: "当前页码", required: false })
  @ApiQuery({ name: "size", description: "每页条数", required: false })
  @ApiOkResponse({
    status: 200,
    description: "操作成功",
    type: QQGroupPageResult,
  })
  @ApiResponse({
    status: 401,
    description: "无权限",
    type: ResponseResult,
  })
  @ApiResponse({
    status: 500,
    description: "系统异常",
    type: ResponseResult,
  })
  @UseInterceptors(ClassSerializerInterceptor)
  @Get()
  getPageList(
    @Query("orderId") orderId,
    @Query("keyword") keyword,
    @Query("content") content,
    @Query("status") status,
    @Query("current") current,
    @Query("size") size
  ) {
    const searchQQGroupDto = new SearchQQGroupDto();
    searchQQGroupDto.orderId = orderId;
    searchQQGroupDto.keyword = keyword;
    searchQQGroupDto.content = content;
    searchQQGroupDto.status = status;
    searchQQGroupDto.page = {
      current,
      size,
    };
    searchQQGroupDto.keyword = keyword;
    return this.qqGroupService.getQQGroupPageList(searchQQGroupDto);
  }

  @ApiOperation({ summary: "根据订单名称获取详情" })
  @ApiParam({
    name: "qqGroupName",
    type: String,
    description: "订单名称",
    required: true,
  })
  @ApiOkResponse({
    status: 200,
    description: "操作成功",
    type: ResponseResult,
  })
  @ApiResponse({
    status: 401,
    description: "无权限",
    type: ResponseResult,
  })
  @ApiResponse({
    status: 500,
    description: "系统异常",
    type: ResponseResult,
  })
  @Get("statistics")
  statistics() {
    return this.qqGroupService.statistics();
  }

  @ApiOperation({ summary: "列表" })
  @ApiOkResponse({
    status: 200,
    description: "操作成功",
    type: QQGroupListResult,
  })
  @ApiResponse({
    status: 401,
    description: "无权限",
    type: ResponseResult,
  })
  @ApiResponse({
    status: 500,
    description: "系统异常",
    type: ResponseResult,
  })
  @Get("/getQQGroupList")
  async getQQGroupList() {
    const list = await this.qqGroupService.getQQGroupList();
    return list;
  }

  @ApiOperation({ summary: "详情" })
  @ApiParam({ name: "id", type: String, description: "主键", required: true })
  @ApiOkResponse({
    status: 200,
    description: "操作成功",
    type: QQGroupResult,
  })
  @ApiResponse({
    status: 401,
    description: "无权限",
    type: ResponseResult,
  })
  @ApiResponse({
    status: 500,
    description: "系统异常",
    type: ResponseResult,
  })
  @Get(":id")
  getQQGroupById(@Param("id") id: string) {
    return this.qqGroupService.getQQGroupById(+id);
  }

  @ApiOperation({ summary: "根据订单名称获取详情" })
  @ApiParam({
    name: "qqGroupName",
    type: String,
    description: "订单名称",
    required: true,
  })
  @ApiOkResponse({
    status: 200,
    description: "操作成功",
    type: QQGroupResult,
  })
  @ApiResponse({
    status: 401,
    description: "无权限",
    type: ResponseResult,
  })
  @ApiResponse({
    status: 500,
    description: "系统异常",
    type: ResponseResult,
  })
  @Get("getQQGroupByQQGroupName/:qqGroupName")
  // @Version('2')
  getQQGroupByQQGroupName(@Param("qqGroupName") qqGroupName: string) {
    return this.qqGroupService.getQQGroupByQQGroupName(qqGroupName);
  }

  @ApiOperation({ summary: "创建" })
  @ApiBody({ type: CreateQQGroupDto, description: "创建订单参数" })
  @ApiOkResponse({
    status: 200,
    description: "操作成功",
    type: ResponseResult,
  })
  @ApiResponse({
    status: 201,
    description: "参数错误",
    type: ResponseResult,
  })
  @ApiResponse({
    status: 401,
    description: "无权限",
    type: ResponseResult,
  })
  @ApiResponse({
    status: 500,
    description: "系统异常",
    type: ResponseResult,
  })
  @Post()
  createQQGroup(@Body() createQQGroupDto: CreateQQGroupDto) {
    return this.qqGroupService.createQQGroup(createQQGroupDto);
  }

  @ApiOperation({ summary: "修改" })
  @ApiParam({ name: "id", type: String, description: "主键", required: true })
  @ApiBody({ type: UpdateQQGroupDto, description: "修改订单参数" })
  @ApiOkResponse({
    status: 200,
    description: "操作成功",
    type: ResponseResult,
  })
  @ApiResponse({
    status: 201,
    description: "参数错误",
    type: ResponseResult,
  })
  @ApiResponse({
    status: 401,
    description: "无权限",
    type: ResponseResult,
  })
  @ApiResponse({
    status: 500,
    description: "系统异常",
    type: ResponseResult,
  })
  @Put(":id")
  updateQQGroupById(
    @Param("id") id: string,
    @Body() updateQQGroupDto: UpdateQQGroupDto
  ) {
    return this.qqGroupService.updateQQGroupById(+id, updateQQGroupDto);
  }

  @ApiOperation({ summary: "删除" })
  @ApiParam({ name: "id", type: String, description: "主键", required: true })
  @ApiOkResponse({
    status: 200,
    description: "操作成功",
    type: ResponseResult,
  })
  @ApiResponse({
    status: 201,
    description: "参数错误",
    type: ResponseResult,
  })
  @ApiResponse({
    status: 401,
    description: "无权限",
    type: ResponseResult,
  })
  @ApiResponse({
    status: 500,
    description: "系统异常",
    type: ResponseResult,
  })
  @Delete(":id")
  removeQQGroupById(@Param("id") id: string) {
    return this.qqGroupService.removeQQGroupById(+id);
  }

  @ApiOperation({ summary: "批量删除" })
  @ApiParam({
    name: "ids",
    type: String,
    description: "主键,多个以逗号隔开",
    required: true,
  })
  @ApiOkResponse({
    status: 200,
    description: "操作成功",
    type: ResponseResult,
  })
  @ApiResponse({
    status: 201,
    description: "参数错误",
    type: ResponseResult,
  })
  @ApiResponse({
    status: 401,
    description: "无权限",
    type: ResponseResult,
  })
  @ApiResponse({
    status: 500,
    description: "系统异常",
    type: ResponseResult,
  })
  @Delete("batchRemove/:ids")
  batchRemove(@Param("ids") ids: string) {
    return this.qqGroupService.removeQQGroupByIds(ids);
  }

  @ApiOperation({ summary: "处理" })
  @ApiParam({ name: "id", type: String, description: "主键", required: true })
  @ApiOkResponse({
    status: 200,
    description: "操作成功",
    type: ResponseResult,
  })
  @ApiResponse({
    status: 201,
    description: "参数错误",
    type: ResponseResult,
  })
  @ApiResponse({
    status: 401,
    description: "无权限",
    type: ResponseResult,
  })
  @ApiResponse({
    status: 500,
    description: "系统异常",
    type: ResponseResult,
  })
  @Patch("excute/:id")
  excute(@Param("id") id: number) {
    return this.qqGroupService.excuteQQGroupById(id);
  }

  @ApiOperation({ summary: "批量处理" })
  @ApiQuery({
    name: "ids",
    type: String,
    description: "主键,多个以逗号隔开",
    required: true,
  })
  @ApiOkResponse({
    status: 200,
    description: "操作成功",
    type: ResponseResult,
  })
  @ApiResponse({
    status: 201,
    description: "参数错误",
    type: ResponseResult,
  })
  @ApiResponse({
    status: 401,
    description: "无权限",
    type: ResponseResult,
  })
  @ApiResponse({
    status: 500,
    description: "系统异常",
    type: ResponseResult,
  })
  @Patch("batchExcute/:ids")
  batchExcute(@Param("ids") ids: string) {
    return this.qqGroupService.batchExcuteQQGroupByIds(ids);
  }
}
