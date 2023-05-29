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

@Controller('system/menus')
export class MenuController {
  constructor(
    private readonly menuService: MenuService,
    private readonly chatGateWay: ChatGateway
  ) {}

  // @Get()
  // getPageList(
  //   @Query('keyword') keyword,
  //   @Query('current') current,
  //   @Query('size') size
  // ) {
  //   const searchMenuDto = new SearchMenuDto();
  //   searchMenuDto.keyword = keyword;
  //   searchMenuDto.page = {
  //     current,
  //     size,
  //   };
  //   searchMenuDto.keyword = keyword;
  //   return this.menuService.getMenuPageList(searchMenuDto);
  // }

  // @Get('/getMenuList')
  @Get()
  async getMenuList() {
    const list = await this.menuService.getMenuList();
    this.chatGateWay.server.emit('message', list);
    return list;
  }

  @Get(':id')
  getMenuById(@Param('id') id: string) {
    return this.menuService.getMenuById(+id);
  }

  @Get('getMenuByMenuName/:menuName')
  getMenuByMenuName(@Param('menuName') menuName: string) {
    return this.menuService.getMenuByMenuName(menuName);
  }

  @Post()
  createMenu(@Body() createMenuDto: CreateMenuDto) {
    return this.menuService.createMenu(createMenuDto);
  }

  @Put(':id')
  updateMenuById(
    @Param('id') id: string,
    @Body() updateMenuDto: UpdateMenuDto
  ) {
    return this.menuService.updateMenuById(+id, updateMenuDto);
  }

  @Delete(':id')
  removeMenuById(@Param('id') id: string) {
    return this.menuService.removeMenuById(+id);
  }
}
