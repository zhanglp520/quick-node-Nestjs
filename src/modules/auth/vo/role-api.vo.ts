import { ApiProperty } from '@nestjs/swagger';
import { AutoMap } from '@automapper/classes';
import { BaseVo } from '@/vos/base.dto';

export class RoleApiVo extends BaseVo {
  @ApiProperty({ description: '角色编号' })
  @AutoMap()
  roleId: number;

  @ApiProperty({ description: '接口编号' })
  @AutoMap()
  apiId: number;
}
