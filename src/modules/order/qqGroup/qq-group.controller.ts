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
  UseGuards,
  // Version,
} from "@nestjs/common";
import { Response } from "express";
import { FileInterceptor } from "@nestjs/platform-express";
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
import { QQGroupVo } from "./vo/qq-group.vo";
import { Role } from "src/common/enums/role.enum";
import { ResponseResult } from "src/common/tools/response.result";
import { RolesGuard } from "src/modules/auth/guards/roles.guard";
import { Roles } from "src/common/decorators/roles.decorator";

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
    type: QQGroupVo,
    // schema: {
    //   type: 'object',
    //   items: {
    //     $ref: getSchemaPath(PageResponseResult),
    //     items: {
    //       $ref: getSchemaPath(QQGroupVo),
    //     },
    //   },
    // },
    // type: ResponseResult<PageResponseResult<QQGroupVo>>,
    // isArray: true,
  })
  // @UseInterceptors(MapInterceptor(DeptEntity, DeptVo, { isArray: true }))
  // @Roles(Role.administrator, Role.admin)
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
    type: QQGroupVo,
  })
  @Get("statistics")
  // @Version('2')
  statistics() {
    return this.qqGroupService.statistics();
  }

  @ApiOperation({ summary: "列表" })
  @ApiOkResponse({
    status: 200,
    description: "操作成功",
    type: QQGroupVo,
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
    type: QQGroupVo,
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
    type: QQGroupVo,
  })
  @Get("getQQGroupByQQGroupName/:qqGroupName")
  // @Version('2')
  getQQGroupByQQGroupName(@Param("qqGroupName") qqGroupName: string) {
    return this.qqGroupService.getQQGroupByQQGroupName(qqGroupName);
  }

  @ApiOperation({ summary: "创建" })
  @ApiBody({ type: CreateQQGroupDto, description: "创建订单参数" })
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
  @Roles(Role.administrator)
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
  @Roles(Role.administrator)
  @Delete("batchRemove/:ids")
  batchRemove(@Param("ids") ids: string) {
    return this.qqGroupService.removeQQGroupByIds(ids);
  }
}
