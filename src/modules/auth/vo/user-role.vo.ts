import { ApiProperty } from '@nestjs/swagger';
import { AutoMap } from '@automapper/classes';
import { BaseVo } from '@/vos/base.dto';
import { RoleVo } from '@/modules/system/role/vo/role.vo';
import { UserVo } from '@/modules/system/user/vo/user.vo';

export class UserRoleVo extends BaseVo {
  @ApiProperty({ description: '用户编号' })
  @AutoMap()
  userId: number;

  @ApiProperty({ description: '角色编号' })
  @AutoMap()
  roleId: number;

  @ApiProperty({ description: '用户' })
  @AutoMap()
  user: UserVo;

  @ApiProperty({ description: '角色' })
  @AutoMap()
  role: RoleVo;
}
