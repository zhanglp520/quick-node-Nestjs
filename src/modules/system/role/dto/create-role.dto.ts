import { ApiProperty } from "@nestjs/swagger";

export class CreateRoleDto {
  @ApiProperty({ description: "角色编号" })
  roleId: string;

  @ApiProperty({ description: "角色名称" })
  roleName: string;

  @ApiProperty({ description: "部门名称" })
  deptId: number;

  @ApiProperty({ description: "备注" })
  remark: string;
}
