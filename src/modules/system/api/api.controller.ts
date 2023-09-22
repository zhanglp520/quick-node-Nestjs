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
} from "@nestjs/common";
import { ApiService } from "./api.service";
import { CreateApiDto } from "./dto/create-api.dto";
import { UpdateApiDto } from "./dto/update-api.dto";
import { SearchApiDto } from "./dto/search-api.dto";
import {
  ApiBody,
  ApiOkResponse,
  ApiOperation,
  ApiParam,
  ApiQuery,
  ApiResponse,
  ApiTags,
} from "@nestjs/swagger";
import { ResponseResult } from "@/common/tools/response.result";
import { Roles } from "@/common/decorators/roles.decorator";
import { Role } from "@/common/enums/role.enum";
import { ApiEntity } from "./entities/api.entity";
import { ApiListResult } from "./result/api.list.result";
import { ApiResult } from "./result/api.result";
import { ApiPageResult } from "./result/api.page.result";

@ApiTags("接口管理")
@Controller("/system/apis")
export class ApiController {
  constructor(private readonly apiService: ApiService) {}

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
    type: ApiPageResult,
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
    const searchApiDto = new SearchApiDto();
    searchApiDto.keyword = keyword;
    searchApiDto.page = {
      current,
      size,
    };
    searchApiDto.keyword = keyword;
    return this.apiService.getApiPageList(searchApiDto);
  }

  @ApiOperation({ summary: "列表" })
  @ApiOkResponse({
    status: 200,
    description: "操作成功",
    type: ApiListResult,
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
  @Get("/getApiList")
  async getApiList() {
    const list = await this.apiService.getApiList();
    return list;
  }

  @ApiOperation({ summary: "详情" })
  @ApiParam({ name: "id", type: String, description: "主键", required: true })
  @ApiOkResponse({
    status: 200,
    description: "操作成功",
    type: ApiResult,
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
  getApiById(@Param("id") id: string) {
    return this.apiService.getApiById(+id);
  }

  @ApiOperation({ summary: "根据接口名称获取详情" })
  @ApiParam({
    name: "apiName",
    type: String,
    description: "接口名称",
    required: true,
  })
  @ApiOkResponse({
    status: 200,
    description: "操作成功",
    type: ApiResult,
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
  @Get("getApiByApiName/:apiName")
  // @Version('2')
  getApiByApiName(@Param("apiName") apiName: string) {
    return this.apiService.getApiByApiName(apiName);
  }

  @ApiOperation({ summary: "创建" })
  @ApiBody({ type: CreateApiDto, description: "创建接口参数" })
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
  createApi(@Body() createApiDto: CreateApiDto) {
    return this.apiService.createApi(createApiDto);
  }

  @ApiOperation({ summary: "修改" })
  @ApiParam({ name: "id", type: String, description: "主键", required: true })
  @ApiBody({ type: UpdateApiDto, description: "修改接口参数" })
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
  updateApiById(@Param("id") id: string, @Body() updateApiDto: UpdateApiDto) {
    return this.apiService.updateApiById(+id, updateApiDto);
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
  removeApiById(@Param("id") id: string) {
    return this.apiService.removeApiById(+id);
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
    return this.apiService.removeApiByIds(ids);
  }
}
