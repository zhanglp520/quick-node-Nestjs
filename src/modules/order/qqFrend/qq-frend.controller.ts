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
import { QQFrendService } from "./qq-frend.service";
import { CreateQQFrendDto } from "./dto/create-qq-frend.dto";
import { UpdateQQFrendDto } from "./dto/update-qq-frend.dto";
import { SearchQQFrendDto } from "./dto/search-qq-frend.dto";

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
import { QQFrendPageResult } from "./result/qq-frend.page.result";
import { QQFrendListResult } from "./result/qq-frend.list.result";
import { QQFrendResult } from "./result/qq-frend.result";

@ApiTags("订单管理")
// @UseInterceptors(new RbacInterceptor(Role.Administrator))
@Controller("/order/qqFrends")
export class QQFrendController {
  constructor(private readonly qqFrendService: QQFrendService) {}

  @ApiOperation({ summary: "分页列表" })
  @ApiQuery({ name: "keyword", description: "关键字", required: false })
  @ApiQuery({ name: "current", description: "当前页码", required: false })
  @ApiQuery({ name: "size", description: "每页条数", required: false })
  @ApiOkResponse({
    status: 200,
    description: "操作成功",
    type: QQFrendPageResult,
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
    @Query("content") content,
    @Query("status") status,
    @Query("current") current,
    @Query("size") size
  ) {
    const searchQQFrendDto = new SearchQQFrendDto();
    searchQQFrendDto.orderId = orderId;
    searchQQFrendDto.content = content;
    searchQQFrendDto.status = status;
    searchQQFrendDto.page = {
      current,
      size,
    };
    return this.qqFrendService.getQQFrendPageList(searchQQFrendDto);
  }

  @ApiOperation({ summary: "根据订单名称获取详情" })
  @ApiParam({
    name: "qqFrendName",
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
    return this.qqFrendService.statistics();
  }

  @ApiOperation({ summary: "列表" })
  @ApiOkResponse({
    status: 200,
    description: "操作成功",
    type: QQFrendListResult,
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
  @Get("/getQQFrendList")
  async getQQFrendList() {
    const list = await this.qqFrendService.getQQFrendList();
    return list;
  }

  @ApiOperation({ summary: "详情" })
  @ApiParam({ name: "id", type: String, description: "主键", required: true })
  @ApiOkResponse({
    status: 200,
    description: "操作成功",
    type: QQFrendResult,
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
  getQQFrendById(@Param("id") id: string) {
    return this.qqFrendService.getQQFrendById(+id);
  }

  @ApiOperation({ summary: "根据订单名称获取详情" })
  @ApiParam({
    name: "qqFrendName",
    type: String,
    description: "订单名称",
    required: true,
  })
  @ApiOkResponse({
    status: 200,
    description: "操作成功",
    type: QQFrendResult,
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
  @Get("getQQFrendByQQFrendName/:qqFrendName")
  // @Version('2')
  getQQFrendByQQFrendName(@Param("qqFrendName") qqFrendName: string) {
    return this.qqFrendService.getQQFrendByQQFrendName(qqFrendName);
  }

  @ApiOperation({ summary: "创建" })
  @ApiBody({ type: CreateQQFrendDto, description: "创建订单参数" })
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
  createQQFrend(@Body() createQQFrendDto: CreateQQFrendDto) {
    return this.qqFrendService.createQQFrend(createQQFrendDto);
  }

  @ApiOperation({ summary: "修改" })
  @ApiParam({ name: "id", type: String, description: "主键", required: true })
  @ApiBody({ type: UpdateQQFrendDto, description: "修改订单参数" })
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
  updateQQFrendById(
    @Param("id") id: string,
    @Body() updateQQFrendDto: UpdateQQFrendDto
  ) {
    return this.qqFrendService.updateQQFrendById(+id, updateQQFrendDto);
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
  removeQQFrendById(@Param("id") id: string) {
    return this.qqFrendService.removeQQFrendById(+id);
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
    return this.qqFrendService.removeQQFrendByIds(ids);
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
    return this.qqFrendService.excuteQQFrendById(id);
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
    return this.qqFrendService.batchExcuteQQFrendByIds(ids);
  }
}
