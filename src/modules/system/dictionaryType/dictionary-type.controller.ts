import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  Put,
} from "@nestjs/common";
import { DictionaryTypeService } from "./dictionary-type.service";
import { CreateDictionaryTypeDto } from "./dto/create-dictionary-type.dto";
import { UpdateDictionaryTypeDto } from "./dto/update-dictionary-type.dto";
import {
  ApiBody,
  ApiOkResponse,
  ApiOperation,
  ApiParam,
  ApiTags,
} from "@nestjs/swagger";
import { ResponseResult } from "src/common/tools/response.result";
import { Roles } from "@/common/decorators/roles.decorator";
import { Role } from "@/common/enums/role.enum";
import { DictionaryTypeEntity } from "./entities/dictionary-type.entity";

@ApiTags("字典分类")
@Controller("/system/dictionaryTypes")
export class DictionaryTypeController {
  constructor(private readonly dictionaryTypeService: DictionaryTypeService) {}

  @ApiOperation({ summary: "列表" })
  @ApiOkResponse({
    status: 200,
    description: "操作成功",
    type: DictionaryTypeEntity,
  })
  @Get()
  async getDictionaryTypeList() {
    const list = await this.dictionaryTypeService.getDictionaryTypeList();
    return list;
  }

  @ApiOperation({ summary: "详情" })
  @ApiParam({ name: "id", type: String, description: "主键", required: true })
  @ApiOkResponse({
    status: 200,
    description: "操作成功",
    type: DictionaryTypeEntity,
  })
  @Get(":id")
  getDictionaryTypeById(@Param("id") id: string) {
    return this.dictionaryTypeService.getDictionaryTypeById(+id);
  }

  @ApiOperation({ summary: "根据字典分类名称获取详情" })
  @ApiOkResponse({
    status: 200,
    description: "操作成功",
    type: DictionaryTypeEntity,
  })
  @Get("getDictionaryTypeByDictionaryTypeName/:dictionaryTypeName")
  getDictionaryTypeByDictionaryTypeName(
    @Param("dictionaryTypeName") dictionaryTypeName: string
  ) {
    return this.dictionaryTypeService.getDictionaryTypeByDictionaryTypeName(
      dictionaryTypeName
    );
  }

  @ApiOperation({ summary: "创建" })
  @ApiBody({ type: CreateDictionaryTypeDto, description: "创建字典分类参数" })
  @ApiOkResponse({
    status: 200,
    description: "操作成功",
    type: ResponseResult,
  })
  @Post()
  createDictionaryType(
    @Body() createDictionaryTypeDto: CreateDictionaryTypeDto
  ) {
    return this.dictionaryTypeService.createDictionaryType(
      createDictionaryTypeDto
    );
  }

  @ApiOperation({ summary: "修改" })
  @ApiParam({ name: "id", type: String, description: "主键", required: true })
  @ApiBody({ type: UpdateDictionaryTypeDto, description: "修改字典分类参数" })
  @ApiOkResponse({
    status: 200,
    description: "操作成功",
    type: ResponseResult,
  })
  @Put(":id")
  updateDictionaryTypeById(
    @Param("id") id: string,
    @Body() updateDictionaryTypeDto: UpdateDictionaryTypeDto
  ) {
    return this.dictionaryTypeService.updateDictionaryTypeById(
      +id,
      updateDictionaryTypeDto
    );
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
  removeDictionaryTypeById(@Param("id") id: string) {
    return this.dictionaryTypeService.removeDictionaryTypeById(+id);
  }
}
