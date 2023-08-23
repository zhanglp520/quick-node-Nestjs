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
} from '@nestjs/common';
import { Response } from 'express';
import { FileInterceptor } from '@nestjs/platform-express';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { SearchUserDto } from './dto/search-user.dto';
import { ChangePasswordDto } from './dto/change-password.dto';
import {
  ApiBody,
  ApiOkResponse,
  ApiOperation,
  ApiParam,
  ApiQuery,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { UserVo } from './vo/user.vo';
import { Role } from 'src/common/enums/role.enum';
import { ResponseResult } from 'src/common/tools/response.result';
import { RolesGuard } from 'src/modules/auth/guards/roles.guard';
import { Roles } from 'src/common/decorators/roles.decorator';

@ApiTags('用户管理')
// @UseInterceptors(new RbacInterceptor(Role.Administrator))
@Controller('/system/users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @ApiOperation({ summary: '分页列表' })
  @ApiQuery({ name: 'keyword', description: '关键字', required: false })
  @ApiQuery({ name: 'current', description: '当前页码', required: false })
  @ApiQuery({ name: 'size', description: '每页条数', required: false })
  @ApiOkResponse({
    status: 200,
    description: '操作成功',
    type: UserVo,
    // schema: {
    //   type: 'object',
    //   items: {
    //     $ref: getSchemaPath(PageResponseResult),
    //     items: {
    //       $ref: getSchemaPath(UserVo),
    //     },
    //   },
    // },
    // type: ResponseResult<PageResponseResult<UserVo>>,
    // isArray: true,
  })
  // @UseInterceptors(MapInterceptor(DeptEntity, DeptVo, { isArray: true }))
  // @Roles(Role.administrator, Role.admin)
  @UseInterceptors(ClassSerializerInterceptor)
  @Get()
  getPageList(
    @Query('keyword') keyword,
    @Query('current') current,
    @Query('size') size
  ) {
    const searchUserDto = new SearchUserDto();
    searchUserDto.keyword = keyword;
    searchUserDto.page = {
      current,
      size,
    };
    searchUserDto.keyword = keyword;
    return this.userService.getUserPageList(searchUserDto);
  }

  @ApiOperation({ summary: '列表' })
  @ApiOkResponse({
    status: 200,
    description: '操作成功',
    type: UserVo,
  })
  @Get('/getUserList')
  async getUserList() {
    const list = await this.userService.getUserList();
    return list;
  }

  @ApiOperation({ summary: '详情' })
  @ApiParam({ name: 'id', type: String, description: '主键', required: true })
  @ApiOkResponse({
    status: 200,
    description: '操作成功',
    type: UserVo,
  })
  @Get(':id')
  getUserById(@Param('id') id: string) {
    return this.userService.getUserById(+id);
  }

  @ApiOperation({ summary: '根据用户名称获取详情' })
  @ApiParam({
    name: 'userName',
    type: String,
    description: '用户名称',
    required: true,
  })
  @ApiOkResponse({
    status: 200,
    description: '操作成功',
    type: UserVo,
  })
  @Get('getUserByUserName/:userName')
  // @Version('2')
  getUserByUserName(@Param('userName') userName: string) {
    return this.userService.getUserByUserName(userName);
  }

  @ApiOperation({ summary: '创建' })
  @ApiBody({ type: CreateUserDto, description: '创建用户参数' })
  @ApiResponse({
    status: 0,
    description: '请求成功',
    type: ResponseResult,
  })
  @ApiResponse({
    status: 201,
    description: '参数错误',
    type: ResponseResult,
  })
  @ApiResponse({
    status: 1,
    description: '操作失败',
    type: ResponseResult,
  })
  @ApiResponse({
    status: 2,
    description: '系统异常',
    type: ResponseResult,
  })
  @Post()
  createUser(@Body() createUserDto: CreateUserDto) {
    return this.userService.createUser(createUserDto);
  }

  @ApiOperation({ summary: '修改' })
  @ApiParam({ name: 'id', type: String, description: '主键', required: true })
  @ApiBody({ type: UpdateUserDto, description: '修改用户参数' })
  @ApiOkResponse({
    status: 200,
    description: '操作成功',
    type: ResponseResult,
  })
  @Put(':id')
  updateUserById(
    @Param('id') id: string,
    @Body() updateUserDto: UpdateUserDto
  ) {
    return this.userService.updateUserById(+id, updateUserDto);
  }

  @ApiOperation({ summary: '删除' })
  @ApiParam({ name: 'id', type: String, description: '主键', required: true })
  @ApiOkResponse({
    status: 200,
    description: '操作成功',
    type: ResponseResult,
  })
  @Roles(Role.administrator)
  @Delete(':id')
  removeUserById(@Param('id') id: string) {
    return this.userService.removeUserById(+id);
  }

  @ApiOperation({ summary: '批量删除' })
  @ApiParam({
    name: 'ids',
    type: String,
    description: '主键,多个以逗号隔开',
    required: true,
  })
  @ApiOkResponse({
    status: 200,
    description: '操作成功',
    type: ResponseResult,
  })
  @Roles(Role.administrator)
  @Delete('batchRemove/:ids')
  batchRemove(@Param('ids') ids: string) {
    return this.userService.removeUserByIds(ids);
  }

  @ApiOperation({ summary: '导入' })
  @ApiParam({
    name: 'ids',
    type: String,
    description: '主键,多个以逗号隔开',
    required: true,
  })
  @ApiOkResponse({
    status: 200,
    description: '操作成功',
    type: ResponseResult,
  })
  @Post('/importUser')
  @UseInterceptors(FileInterceptor('file'))
  async importUser(@UploadedFile() file: Express.Multer.File) {
    await this.userService.importExcel(file);
  }

  @ApiOperation({ summary: '导出' })
  @ApiParam({
    name: 'ids',
    type: String,
    description: '主键,多个以逗号隔开',
    required: true,
  })
  @ApiOkResponse({
    status: 200,
    description: '操作成功',
    type: ResponseResult,
  })
  @Get('/exportUser')
  async exportUser(@Res() res: Response) {
    const stream = await this.userService.exportExcel();
    res.send(stream);
  }

  @ApiOperation({ summary: '启用' })
  @ApiParam({
    name: 'id',
    type: String,
    description: '主键',
    required: true,
  })
  @ApiOkResponse({
    status: 200,
    description: '操作成功',
    type: ResponseResult,
  })
  @Patch('enabled/:id')
  enabled(@Param('id') id: string) {
    return this.userService.enabledUserById(+id);
  }

  @ApiOperation({ summary: '禁用' })
  @ApiParam({
    name: 'id',
    type: String,
    description: '主键',
    required: true,
  })
  @ApiOkResponse({
    status: 200,
    description: '操作成功',
    type: ResponseResult,
  })
  @Patch('disable/:id')
  disable(@Param('id') id: string) {
    return this.userService.disableUserById(+id);
  }

  @ApiOperation({ summary: '重置密码' })
  @ApiParam({
    name: 'id',
    type: String,
    description: '主键',
    required: true,
  })
  @ApiOkResponse({
    status: 200,
    description: '操作成功',
    type: ResponseResult,
  })
  @Patch('resetPassword/:id')
  resetPassword(@Param('id') id: string) {
    return this.userService.resetUserPasswordById(+id);
  }

  @ApiOperation({ summary: '修改密码' })
  @ApiParam({
    name: 'id',
    type: String,
    description: '主键',
    required: true,
  })
  @ApiOkResponse({
    status: 200,
    description: '操作成功',
    type: ResponseResult,
  })
  @Patch('changePassword/:id')
  changePassword(
    @Param('id') id: string,
    @Body() changePasswordDto: ChangePasswordDto
  ) {
    return this.userService.changePasswordById(+id, changePasswordDto);
  }
}
