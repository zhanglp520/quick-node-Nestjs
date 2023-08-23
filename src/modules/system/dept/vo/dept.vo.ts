import { ApiExtraModels, ApiProperty } from '@nestjs/swagger';
import { BaseEntity, Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import { AutoMap } from '@automapper/classes';
import { BaseVo } from 'src/vos/base.dto';

export class DeptVo extends BaseVo {
  @ApiProperty({ description: '部门编号' })
  @AutoMap()
  deptId: string;

  @ApiProperty({ description: '部门名称' })
  @AutoMap()
  deptName: string;

  @ApiProperty({ description: '父级部门编号' })
  @AutoMap()
  pId: string;
}
