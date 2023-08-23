import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  Put,
} from '@nestjs/common';
import { MenuService } from './menu.service';
import { CreateMenuDto } from './dto/create-menu.dto';
import { UpdateMenuDto } from './dto/update-menu.dto';
import { ChatGateway } from '../../chat/chat.gateway';
import {
  ApiBody,
  ApiOkResponse,
  ApiOperation,
  ApiParam,
  ApiTags,
} from '@nestjs/swagger';
import { MenuEntity } from './entities/menu.entity';
import { Roles } from '@/common/decorators/roles.decorator';
import { Role } from '@/common/enums/role.enum';

@ApiTags('菜单管理')
@Controller('system/menus')
export class MenuController {
  constructor(
    private readonly menuService: MenuService,
    private readonly chatGateWay: ChatGateway
  ) {}

  @ApiOperation({ summary: '列表' })
  @ApiOkResponse({
    status: 200,
    description: '操作成功',
    type: Array<MenuEntity>,
  })
  @Get()
  async getMenuList() {
    const list = await this.menuService.getMenuList();
    this.chatGateWay.server.emit('message', list);
    return list;
  }

  @ApiOperation({ summary: '详情' })
  @ApiParam({ name: 'id', type: String, description: '主键', required: true })
  @ApiOkResponse({
    status: 200,
    description: '操作成功',
    type: MenuEntity,
  })
  @Get(':id')
  getMenuById(@Param('id') id: string) {
    return this.menuService.getMenuById(+id);
  }

  @ApiOperation({ summary: '根据菜单名称获取详情' })
  @Get('getMenuByMenuName/:menuName')
  getMenuByMenuName(@Param('menuName') menuName: string) {
    return this.menuService.getMenuByMenuName(menuName);
  }

  @ApiOperation({ summary: '创建' })
  @ApiBody({ type: CreateMenuDto, description: '创建菜单参数' })
  @ApiOkResponse({ status: 200, description: '操作成功', type: CreateMenuDto })
  @Post()
  createMenu(@Body() createMenuDto: CreateMenuDto) {
    return this.menuService.createMenu(createMenuDto);
  }

  @ApiOperation({ summary: '修改' })
  @ApiParam({ name: 'id', type: String, description: '主键', required: true })
  @ApiBody({ type: UpdateMenuDto, description: '修改菜单参数' })
  @ApiOkResponse({ status: 200, description: '操作成功', type: UpdateMenuDto })
  @Put(':id')
  updateMenuById(
    @Param('id') id: string,
    @Body() updateMenuDto: UpdateMenuDto
  ) {
    return this.menuService.updateMenuById(+id, updateMenuDto);
  }

  @ApiOperation({ summary: '删除' })
  // @Roles(Role.administrator)
  @Delete(':id')
  removeMenuById(@Param('id') id: string) {
    return this.menuService.removeMenuById(+id);
  }
}
