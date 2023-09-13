import { ApiProperty } from "@nestjs/swagger";
import { AutoMap } from "@automapper/classes";
import { BaseVo } from "src/vos/base.dto";
import { UserVo } from "../../user/vo/user.vo";
import { UserRoleVo } from "@/modules/auth/vo/user-role.vo";

export class RoleVo extends BaseVo {
  @ApiProperty({ description: "角色编号" })
  @AutoMap()
  roleId: string;

  @ApiProperty({ description: "角色名称" })
  @AutoMap()
  roleName: string;

  // @ApiProperty({ description: '用户' })
  // @AutoMap()
  // users: UserVo[];

  // @ApiProperty({ description: '用户角色关系' })
  // @AutoMap()
  // userRoles: UserRoleVo[];
}
