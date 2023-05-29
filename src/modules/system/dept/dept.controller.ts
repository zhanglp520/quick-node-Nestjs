import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  Put,
} from '@nestjs/common';
import { DeptService } from './dept.service';
import { CreateDeptDto } from './dto/create-dept.dto';
import { UpdateDeptDto } from './dto/update-dept.dto';

@Controller('/system/depts')
export class DeptController {
  constructor(private readonly deptService: DeptService) {}

  @Get('getDeptByPId/:pId')
  getDeptByPId(@Param('pId') pId: string) {
    return this.deptService.getDeptByPId(pId);
  }

  @Get()
  async getDeptList() {
    const list = await this.deptService.getDeptList();
    return list;
  }

  @Get(':id')
  getDeptById(@Param('id') id: string) {
    return this.deptService.getDeptById(+id);
  }

  @Get('getDeptByDeptName/:deptName')
  getDeptByDeptName(@Param('deptName') deptName: string) {
    return this.deptService.getDeptByDeptName(deptName);
  }

  @Post()
  createDept(@Body() createDeptDto: CreateDeptDto) {
    return this.deptService.createDept(createDeptDto);
  }

  @Put(':id')
  updateDeptById(
    @Param('id') id: string,
    @Body() updateDeptDto: UpdateDeptDto
  ) {
    return this.deptService.updateDeptById(+id, updateDeptDto);
  }

  @Delete(':id')
  removeDeptById(@Param('id') id: string) {
    return this.deptService.removeDeptById(+id);
  }
}
