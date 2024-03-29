import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  Put,
} from "@nestjs/common";
import { DeptService } from "./dept.service";
import { CreateDeptDto } from "./dto/create-dept.dto";
import { UpdateDeptDto } from "./dto/update-dept.dto";
import {
  ApiBody,
  ApiOkResponse,
  ApiOperation,
  ApiParam,
  ApiResponse,
  ApiTags,
} from "@nestjs/swagger";
import { ResponseResult } from "@/common/tools/response.result";
import { Role } from "@/common/enums/role.enum";
import { Roles } from "@/common/decorators/roles.decorator";
import { DeptEntity } from "./entities/dept.entity";
import { DeptResult } from "./result/dept.result";
import { DeptListResult } from "./result/dept.list.result";

@ApiTags("部门管理")
@Controller("/system/depts")
export class DeptController {
  constructor(private readonly deptService: DeptService) {}

  @ApiOperation({
    summary: "根据父id获取部门列表",
  })
  @ApiParam({
    name: "pId",
    type: String,
    description: "父菜单编号",
    required: true,
  })
  @ApiOkResponse({
    status: 200,
    description: "操作成功",
    type: DeptResult,
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
  @Get("getDeptByPId/:pId")
  getDeptByPId(@Param("pId") pId: string) {
    return this.deptService.getDeptByPId(pId);
  }

  @ApiOperation({ summary: "列表" })
  @ApiOkResponse({
    status: 200,
    description: "操作成功",
    type: DeptListResult,
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
  @Get()
  async getDeptList() {
    const list = await this.deptService.getDeptList();
    return list;
  }

  @ApiOperation({ summary: "详情" })
  @ApiParam({ name: "id", type: String, description: "主键", required: true })
  @ApiOkResponse({
    status: 200,
    description: "操作成功",
    type: DeptResult,
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
  getDeptById(@Param("id") id: string) {
    return this.deptService.getDeptById(+id);
  }

  @ApiOperation({ summary: "根据部门名称获取详情" })
  @ApiParam({
    name: "deptName",
    type: String,
    description: "部门名称",
    required: true,
  })
  @ApiOkResponse({
    status: 200,
    description: "操作成功",
    type: DeptResult,
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
  @Get("getDeptByDeptName/:deptName")
  getDeptByDeptName(@Param("deptName") deptName: string) {
    return this.deptService.getDeptByDeptName(deptName);
  }

  @ApiOperation({ summary: "创建" })
  @ApiBody({ type: CreateDeptDto, description: "创建部门参数" })
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
  createDept(@Body() createDeptDto: CreateDeptDto) {
    return this.deptService.createDept(createDeptDto);
  }

  @ApiOperation({ summary: "修改" })
  @ApiParam({ name: "id", type: String, description: "主键", required: true })
  @ApiBody({ type: UpdateDeptDto, description: "修改部门参数" })
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
  updateDeptById(
    @Param("id") id: string,
    @Body() updateDeptDto: UpdateDeptDto
  ) {
    return this.deptService.updateDeptById(+id, updateDeptDto);
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
  removeDeptById(@Param("id") id: string) {
    return this.deptService.removeDeptById(+id);
  }
}
