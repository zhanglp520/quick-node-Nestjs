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
  // Version,
} from '@nestjs/common';
import { Response } from 'express';
import { FileInterceptor } from '@nestjs/platform-express'
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { SearchUserDto } from './dto/search-user.dto';
import { ChangePasswordDto } from './dto/change-password.dto';

@Controller('/system/users')
export class UserController {
  constructor(private readonly userService: UserService) { }

  @Post('/importUser')
  @UseInterceptors(FileInterceptor('file'))
  async importUser(@UploadedFile() file: Express.Multer.File) {
    await this.userService.importExcel(file)
  }

  @Get('/exportUser')
  async exportUser(@Res() res: Response) {
    const stream = await this.userService.exportExcel()
    res.send(stream);
  }

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

  @Get('/getUserList')
  async getUserList() {
    const list = await this.userService.getUserList();
    return list;
  }

  @Get(':id')
  getUserById(@Param('id') id: string) {
    return this.userService.getUserById(+id);
  }

  @Get('getUserByUserName/:userName')
  // @Version('2')
  getUserByUserName(@Param('userName') userName: string) {
    return this.userService.getUserByUserName(userName);
  }

  @Post()
  createUser(@Body() createUserDto: CreateUserDto) {
    return this.userService.createUser(createUserDto);
  }

  @Put(':id')
  updateUserById(
    @Param('id') id: string,
    @Body() updateUserDto: UpdateUserDto
  ) {
    return this.userService.updateUserById(+id, updateUserDto);
  }

  @Delete(':id')
  removeUserById(@Param('id') id: string) {
    return this.userService.removeUserById(+id);
  }

  @Delete('batchRemove/:ids')
  batchRemove(@Param('ids') ids: string) {
    return this.userService.removeUserByIds(ids);
  }
  @Patch('enabled/:id')
  enabled(@Param('id') id: string) {
    return this.userService.enabledUserById(+id);
  }
  @Patch('disable/:id')
  disable(@Param('id') id: string) {
    return this.userService.disableUserById(+id);
  }
  @Patch('resetPassword/:id')
  resetPassword(@Param('id') id: string) {
    return this.userService.resetUserPasswordById(+id);
  }
  @Patch('changePassword/:id')
  changePassword(
    @Param('id') id: string,
    @Body() changePasswordDto: ChangePasswordDto
  ) {
    return this.userService.changePasswordById(+id, changePasswordDto);
  }
}
