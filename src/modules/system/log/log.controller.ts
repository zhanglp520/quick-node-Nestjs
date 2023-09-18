import {
  Controller,
  Get,
  Param,
  Delete,
  Query,
  UseInterceptors,
  ClassSerializerInterceptor,
} from "@nestjs/common";
import { LogService } from "./log.service";
import { SearchLogDto } from "./dto/search-log.dto";
import {
  ApiOkResponse,
  ApiOperation,
  ApiParam,
  ApiQuery,
  ApiTags,
} from "@nestjs/swagger";
import { ResponseResult } from "src/common/tools/response.result";
import { Roles } from "@/common/decorators/roles.decorator";
import { Role } from "@/common/enums/role.enum";
import { LogEntity } from "./entities/log.entity";

@ApiTags("日志管理")
@Controller("/system/logs")
export class LogController {
  constructor(private readonly logService: LogService) {}

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
    type: LogEntity,
  })
  @UseInterceptors(ClassSerializerInterceptor)
  @Get()
  getPageList(
    @Query("type") type,
    @Query("keyword") keyword,
    @Query("startTime") startTime,
    @Query("endTime") endTime,
    @Query("current") current,
    @Query("size") size
  ) {
    const searchLogDto = new SearchLogDto();
    searchLogDto.keyword = keyword;
    searchLogDto.startTime = startTime;
    searchLogDto.type = type;
    searchLogDto.endTime = endTime;
    searchLogDto.page = {
      current,
      size,
    };
    searchLogDto.keyword = keyword;
    return this.logService.getLogPageList(searchLogDto);
  }

  @ApiOperation({ summary: "详情" })
  @ApiParam({ name: "id", type: String, description: "主键", required: true })
  @ApiOkResponse({
    status: 200,
    description: "操作成功",
    type: LogEntity,
  })
  @Get(":id")
  getLogById(@Param("id") id: string) {
    return this.logService.getLogById(+id);
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
  removeLogById(@Param("id") id: string) {
    return this.logService.removeLogById(+id);
  }
}
