import { ApiProperty } from "@nestjs/swagger";

export class CreateRoleMenuDto {
  @ApiProperty({ description: "角色编号" })
  roleId: number;

  @ApiProperty({ description: "菜单编号，多个以逗号隔开" })
  menuIds: string;
}
