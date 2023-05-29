import { Body, Controller, Get, Param, Post, Request } from '@nestjs/common';
import { Public } from 'src/common/decorators/public.decorator';
import { AuthService } from './auth.service';
import { CreateRoleMenuDto } from './dtos/create-role-menu.dto';
import { CreateUserRoleDto } from './dtos/create-user-role.dto';

/*
 *@Description: 权限管理模块控制器
 *@Author: 土豆哥
 *@Date: 2022-11-28 21:16:30
 */
@Controller('/auths')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  /*
   *@Description: 登录
   *@Author: 土豆哥
   *@Date: 2022-11-28 21:16:10
   */
  @Public()
  @Post('/login')
  login(@Request() req) {
    return this.authService.login(req.body);
  }
  /*
   *@Description: 注销
   *@Author: 土豆哥
   *@Date: 2022-11-28 21:15:58
   */
  @Public()
  @Post('/logout')
  logout() {
    return this.authService.logout();
  }
  /*
   *@Description: 刷新令牌
   *@Author: 土豆哥
   *@Date: 2022-11-28 21:15:38
   */
  @Public()
  @Post('/refreshToken')
  refreshToken(@Request() req) {
    const { quickRefreshToken } = req.body;
    return this.authService.refreshToken(quickRefreshToken);
  }
  /*
   *@Description: 获取用户权限
   *@Author: 土豆哥
   *@Date: 2022-11-28 21:14:34
   */
  @Get('getMenuListByUserId/:id')
  getMenuListByUserId(@Param('id') id: string) {
    return this.authService.getMenuByUserId(+id);
  }
  /*
   *@Description: 获取角色分配的用户权限
   *@Author: 土豆哥
   *@Date: 2022-11-28 21:13:51
   */
  @Get('/getUserListByRoleId/:id')
  getUserListByRoleId(@Param('id') id: string) {
    return this.authService.getUserListByRoleId(+id);
  }
  /*
   *@Description: 获取角色分配的菜单权限
   *@Author: 土豆哥
   *@Date: 2022-11-28 21:13:04
   */
  @Get('/getMenuListByRoleId/:id')
  getMenuListByRoleId(@Param('id') id: string) {
    return this.authService.getMenuListByRoleId(+id);
  }
  /*
   *@Description: 角色分配用户
   *@Author: 土豆哥
   *@Date: 2022-11-29 00:13:43
   */
  @Post('/assignUser')
  assignUser(@Body() createUserRoleDto: CreateUserRoleDto) {
    return this.authService.assignUser(createUserRoleDto);
  }
  /*
   *@Description: 角色分配权限
   *@Author: 土豆哥
   *@Date: 2022-11-29 00:13:59
   */
  @Post('/assignPermission')
  assignPermission(@Body() createRoleMenuDto: CreateRoleMenuDto) {
    return this.authService.assignPermission(createRoleMenuDto);
  }
}
