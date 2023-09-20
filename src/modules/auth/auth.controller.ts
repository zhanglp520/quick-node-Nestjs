import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { Public } from 'src/common/decorators/public.decorator';
import { AuthService } from './auth.service';
import { CreateRoleMenuDto } from './dtos/create-role-menu.dto';
import { CreateUserRoleDto } from './dtos/create-user-role.dto';
import {
  ApiBody,
  ApiOkResponse,
  ApiOperation,
  ApiParam,
  ApiTags,
} from '@nestjs/swagger';
import { ResponseResult } from '@/common/tools/response.result';
import { RefreshTokenDto } from '@/modules/auth/dtos/refresh-token.dto';
import { LoginDto } from '@/modules/auth/dtos/login.dto';
import { Token } from '@/common/tools/token';
import { MenuEntity } from '../system/menu/entities/menu.entity';

@ApiTags('权限管理')
@Controller('/auths')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @ApiOperation({ summary: '登录' })
  @ApiBody({ type: LoginDto, description: '登录参数' })
  @ApiOkResponse({
    status: 200,
    description: '操作成功',
     type: ResponseResult,
  })
  @Public()
  @Post('/login')
  login(@Body() login: LoginDto) {
    return this.authService.login(login);
  }

  @ApiOperation({ summary: '注销' })
  @ApiOkResponse({
    status: 200,
    description: '操作成功',
    type: ResponseResult,
  })
  @Public()
  @Post('/logout')
  logout() {
    return this.authService.logout();
  }

  @ApiOperation({ summary: '刷新令牌' })
  @ApiOkResponse({
    status: 200,
    description: '操作成功',
     type: ResponseResult,
  })
  @Public()
  @Post('/refreshToken')
  refreshToken(@Body() refreshTokenDto: RefreshTokenDto) {
    return this.authService.refreshToken(refreshTokenDto);
  }

  @ApiOperation({ summary: '获取用户权限' })
  @ApiParam({
    name: 'id',
    type: String,
    description: '用户主键',
    required: true,
  })
  @ApiOkResponse({
    status: 200,
    description: '操作成功',
    type: MenuEntity,
  })
  @Get('getMenuListByUserId/:id')
  getMenuListByUserId(@Param('id') id: string) {
    return this.authService.getMenuByUserId(+id);
  }

  @ApiOperation({ summary: '获取角色分配的用户权限' })
  @ApiParam({
    name: 'id',
    type: String,
    description: '角色主键',
    required: true,
  })
  @ApiOkResponse({
    status: 200,
    description: '操作成功',
    type: Array<number>,
  })
  @Get('/getUserListByRoleId/:id')
  getUserListByRoleId(@Param('id') id: string) {
    return this.authService.getUserListByRoleId(+id);
  }

  @ApiOperation({ summary: '获取角色分配的菜单权限' })
  @ApiParam({
    name: 'id',
    type: String,
    description: '角色主键',
    required: true,
  })
  @ApiOkResponse({
    status: 200,
    description: '操作成功',
    type: Array<number>,
  })
  @Get('/getMenuListByRoleId/:id')
  getMenuListByRoleId(@Param('id') id: string) {
    return this.authService.getMenuListByRoleId(+id);
  }

  @ApiOperation({ summary: '角色分配用户' })
  @ApiBody({ type: CreateUserRoleDto, description: '角色分配用户参数' })
  @ApiOkResponse({
    status: 200,
    description: '操作成功',
    type: ResponseResult,
  })
  @Post('/assignUser')
  assignUser(@Body() createUserRoleDto: CreateUserRoleDto) {
    return this.authService.assignUser(createUserRoleDto);
  }

  @ApiOperation({ summary: '角色分配权限' })
  @ApiBody({ type: CreateRoleMenuDto, description: '角色分配权限参数' })
  @ApiOkResponse({
    status: 200,
    description: '操作成功',
    type: ResponseResult,
  })
  @Post('/assignPermission')
  assignPermission(@Body() createRoleMenuDto: CreateRoleMenuDto) {
    return this.authService.assignPermission(createRoleMenuDto);
  }

  @ApiOperation({ summary: '已分配的接口权限' })
  @ApiParam({
    name: 'id',
    type: String,
    description: '角色主键',
    required: true,
  })
  @ApiOkResponse({
    status: 200,
    description: '操作成功',
    type: ResponseResult,
  })
  @Get('/getApiListByRoleId/:id')
  async getApiListByRoleId(@Param('id') id: string) {
    return await this.authService.getApiListByRoleId(+id);
  }
  // @Post('/assignPermission')
  // assignPermission(@Body() createRoleMenuDto: CreateRoleMenuDto) {
  //   return this.authService.assignPermission(createRoleMenuDto);
  // }
}
