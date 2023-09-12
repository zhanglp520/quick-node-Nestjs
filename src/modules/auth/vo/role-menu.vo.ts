import { ApiProperty } from "@nestjs/swagger";
import { AutoMap } from "@automapper/classes";
import { BaseVo } from "@/vos/base.dto";

export class RoleMenuVo extends BaseVo {
  @ApiProperty({ description: "角色编号" })
  @AutoMap()
  roleId: number;

  @ApiProperty({ description: "菜单编号" })
  @AutoMap()
  menuId: number;
}
