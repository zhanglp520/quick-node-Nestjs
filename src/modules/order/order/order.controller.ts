import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  Query,
  Res,
  Put,
  ClassSerializerInterceptor,
  UseInterceptors,
  Patch,
  UploadedFile,
} from "@nestjs/common";
import { Response } from "express";
import { FileInterceptor } from "@nestjs/platform-express";
import { OrderService } from "./order.service";
import { CreateOrderDto } from "./dto/create-order.dto";
import { UpdateOrderDto } from "./dto/update-order.dto";
import { SearchOrderDto } from "./dto/search-order.dto";
import {
  ApiBody,
  ApiOkResponse,
  ApiOperation,
  ApiParam,
  ApiQuery,
  ApiResponse,
  ApiTags,
} from "@nestjs/swagger";
import { Role } from "src/common/enums/role.enum";
import { ResponseResult } from "src/common/tools/response.result";
import { Roles } from "src/common/decorators/roles.decorator";
import { OrderPageResult } from "./result/order.page.result";
import { OrderListResult } from "./result/order.list.result";
import { OrderResult } from "./result/order.result";

@ApiTags("订单管理")
@Controller("/order/orders")
export class OrderController {
  constructor(private readonly orderService: OrderService) {}

  @ApiOperation({ summary: "分页列表" })
  @ApiQuery({
    name: "keyword",
    description: "关键字",
    required: false,
    type: String,
  })
  @ApiQuery({
    name: "current",
    description: "当前页码",
    required: true,
    type: Number,
  })
  @ApiQuery({
    name: "size",
    description: "每页条数",
    required: true,
    type: Number,
  })
  @ApiOkResponse({
    status: 200,
    description: "操作成功",
    type: OrderPageResult,
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
    @Query("keyword") keyword,
    @Query("current") current,
    @Query("size") size
  ) {
    const searchOrderDto = new SearchOrderDto();
    searchOrderDto.keyword = keyword;
    searchOrderDto.page = {
      current,
      size,
    };
    searchOrderDto.keyword = keyword;
    return this.orderService.getOrderPageList(searchOrderDto);
  }

  @ApiOperation({ summary: "列表" })
  @ApiOkResponse({
    status: 200,
    description: "操作成功",
    type: OrderListResult,
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
  @Get("/getOrderList")
  async getOrderList() {
    const list = await this.orderService.getOrderList();
    return list;
  }

  @ApiOperation({ summary: "详情" })
  @ApiParam({ name: "id", type: String, description: "主键", required: true })
  @ApiOkResponse({
    status: 200,
    description: "操作成功",
    type: OrderResult,
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
  @Get(":id")
  getOrderById(@Param("id") id: string) {
    return this.orderService.getOrderById(+id);
  }

  @ApiOperation({ summary: "根据订单名称获取详情" })
  @ApiParam({
    name: "orderName",
    type: String,
    description: "订单名称",
    required: true,
  })
  @ApiOkResponse({
    status: 200,
    description: "操作成功",
    type: OrderResult,
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
  @Get("getOrderByOrderName/:orderName")
  getOrderByOrderName(@Param("orderName") orderName: string) {
    return this.orderService.getOrderByOrderName(orderName);
  }

  @ApiOperation({ summary: "创建" })
  @ApiBody({ type: CreateOrderDto, description: "创建订单参数" })
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
  createOrder(@Body() createOrderDto: CreateOrderDto) {
    return this.orderService.createOrder(createOrderDto);
  }

  @ApiOperation({ summary: "修改" })
  @ApiParam({ name: "id", type: String, description: "主键", required: true })
  @ApiBody({ type: UpdateOrderDto, description: "修改订单参数" })
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
  updateOrderById(
    @Param("id") id: string,
    @Body() updateOrderDto: UpdateOrderDto
  ) {
    return this.orderService.updateOrderById(+id, updateOrderDto);
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
  removeOrderById(@Param("id") id: string) {
    return this.orderService.removeOrderById(+id);
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
    return this.orderService.removeOrderByIds(ids);
  }
}
