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
import { DictionaryService } from "./dictionary.service";
import { CreateDictionaryDto } from "./dto/create-dictionary.dto";
import { UpdateDictionaryDto } from "./dto/update-dictionary.dto";
import {
  ApiBody,
  ApiOkResponse,
  ApiOperation,
  ApiParam,
  ApiResponse,
  ApiTags,
} from "@nestjs/swagger";
import { ResponseResult } from "src/common/tools/response.result";
import { Roles } from "@/common/decorators/roles.decorator";
import { Role } from "@/common/enums/role.enum";
import { DictionaryEntity } from "./entities/dictionary.entity";
import { DictionaryListResult } from "./result/dictionary.list.result";
import { DictionaryResult } from "./result/dictionary.result";

@ApiTags("字典管理")
@Controller("/system/dictionaries")
export class DictionaryController {
  constructor(private readonly dictionaryService: DictionaryService) {}

  @ApiOperation({ summary: "根据分类编号获取字典列表" })
  @ApiOkResponse({
    status: 200,
    description: "操作成功",
    type: DictionaryListResult,
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
  @Get()
  async getDictionaryListByTypeId(@Query("typeId") typeId) {
    return await this.dictionaryService.getDictionaryListByTypeId(typeId);
  }

  @ApiOperation({ summary: "详情" })
  @ApiParam({ name: "id", type: String, description: "主键", required: true })
  @ApiOkResponse({
    status: 200,
    description: "操作成功",
    type: DictionaryResult,
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
  getDictionaryById(@Param("id") id: string) {
    return this.dictionaryService.getDictionaryById(+id);
  }

  @ApiOperation({ summary: "根据字典名称获取字典详情" })
  @ApiOkResponse({
    status: 200,
    description: "操作成功",
    type: DictionaryResult,
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
  @Get("getDictionaryByDictionaryName/:dictionaryName")
  getDictionaryByDictionaryName(
    @Param("dictionaryName") dictionaryName: string
  ) {
    return this.dictionaryService.getDictionaryByDictionaryName(dictionaryName);
  }

  @ApiOperation({ summary: "创建" })
  @ApiBody({ type: CreateDictionaryDto, description: "创建字典参数" })
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
  createDictionary(@Body() createDictionaryDto: CreateDictionaryDto) {
    return this.dictionaryService.createDictionary(createDictionaryDto);
  }

  @ApiOperation({ summary: "修改" })
  @ApiParam({ name: "id", type: String, description: "主键", required: true })
  @ApiBody({ type: UpdateDictionaryDto, description: "修改字典参数" })
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
  updateDictionaryById(
    @Param("id") id: string,
    @Body() updateDictionaryDto: UpdateDictionaryDto
  ) {
    return this.dictionaryService.updateDictionaryById(
      +id,
      updateDictionaryDto
    );
  }

  @ApiOperation({ summary: "删除" })
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
  removeDictionaryById(@Param("id") id: string) {
    return this.dictionaryService.removeDictionaryById(+id);
  }
}
