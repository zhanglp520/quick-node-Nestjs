import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  Query,
  Put,
} from '@nestjs/common';
import { RoleService } from './role.service';
import { CreateRoleDto } from './dto/create-role.dto';
import { UpdateRoleDto } from './dto/update-role.dto';
import { SearchRoleDto } from './dto/search-role.dto';

@Controller('/system/roles')
export class RoleController {
  constructor(private readonly roleService: RoleService) {}

  @Get('getPageList')
  getPageList(
    @Query('keyword') keyword,
    @Query('current') current,
    @Query('size') size
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

  @Get()
  async getRoleList() {
    const list = await this.roleService.getRoleList();
    return list;
  }

  @Get(':id')
  getRoleById(@Param('id') id: string) {
    return this.roleService.getRoleById(+id);
  }

  @Get('getRoleByRoleName/:roleName')
  getRoleByRoleName(@Param('roleName') roleName: string) {
    return this.roleService.getRoleByRoleName(roleName);
  }

  @Post()
  createRole(@Body() createRoleDto: CreateRoleDto) {
    return this.roleService.createRole(createRoleDto);
  }

  @Put(':id')
  updateRoleById(
    @Param('id') id: string,
    @Body() updateRoleDto: UpdateRoleDto
  ) {
    return this.roleService.updateRoleById(+id, updateRoleDto);
  }

  @Delete(':id')
  removeRoleById(@Param('id') id: string) {
    return this.roleService.removeRoleById(+id);
  }
}
