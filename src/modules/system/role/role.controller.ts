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
import { RoleService } from "./role.service";
import { CreateRoleDto } from "./dto/create-role.dto";
import { UpdateRoleDto } from "./dto/update-role.dto";
import { SearchRoleDto } from "./dto/search-role.dto";
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
import { Roles } from "@/common/decorators/roles.decorator";
import { Role } from "@/common/enums/role.enum";
import { RoleEntity } from "./entities/role.entity";
import { RolePageResult } from "./result/role.page.result";
import { RoleListResult } from "./result/role.list.result";
import { RoleResult } from "./result/role.result";

@ApiTags("角色管理")
@Controller("/system/roles")
export class RoleController {
  constructor(private readonly roleService: RoleService) {}

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
    type: RolePageResult,
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
  @Get("getPageList")
  getPageList(
    @Query("keyword") keyword,
    @Query("current") current,
    @Query("size") size
  ) {
    const searchRoleDto = new SearchRoleDto();
    searchRoleDto.keyword = keyword;
    searchRoleDto.page = {
      current,
      size,
    };
    searchRoleDto.keyword = keyword;
    return this.roleService.getRolePageList(searchRoleDto);
  }

  @ApiOperation({ summary: "列表" })
  @ApiOkResponse({
    status: 200,
    description: "操作成功",
    type: RoleListResult,
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
  async getRoleList() {
    const list = await this.roleService.getRoleList();
    return list;
  }

  @ApiOperation({ summary: "详情" })
  @ApiParam({ name: "id", type: String, description: "主键", required: true })
  @ApiOkResponse({
    status: 200,
    description: "操作成功",
    type: RoleResult,
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
  getRoleById(@Param("id") id: string) {
    return this.roleService.getRoleById(+id);
  }

  @ApiOperation({ summary: "根据角色名称获取详情" })
  @ApiParam({
    name: "roleName",
    type: String,
    description: "角色名称",
    required: true,
  })
  @ApiOkResponse({
    status: 200,
    description: "操作成功",
    type: RoleResult,
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
  @Get("getRoleByRoleName/:roleName")
  getRoleByRoleName(@Param("roleName") roleName: string) {
    return this.roleService.getRoleByRoleName(roleName);
  }

  @ApiOperation({ summary: "创建" })
  @ApiBody({ type: CreateRoleDto, description: "创建角色参数" })
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
  createRole(@Body() createRoleDto: CreateRoleDto) {
    return this.roleService.createRole(createRoleDto);
  }

  @ApiOperation({ summary: "修改" })
  @ApiParam({ name: "id", type: String, description: "主键", required: true })
  @ApiBody({ type: CreateRoleDto, description: "修改角色参数" })
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
  updateRoleById(
    @Param("id") id: string,
    @Body() updateRoleDto: UpdateRoleDto
  ) {
    return this.roleService.updateRoleById(+id, updateRoleDto);
  }

  @ApiOperation({ summary: "删除" })
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
  @Roles(Role.administrator)
  @Delete(":id")
  removeRoleById(@Param("id") id: string) {
    return this.roleService.removeRoleById(+id);
  }
}
