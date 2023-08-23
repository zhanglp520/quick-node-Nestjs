import { ApiProperty } from '@nestjs/swagger';

export class CreateUserRoleDto {
  @ApiProperty({ description: '角色编号' })
  roleId: number;

  @ApiProperty({ description: '用户编号，多个以逗号隔开' })
  userIds: string;
}
