import { AutoMap } from "@automapper/classes";
import { ApiProperty } from "@nestjs/swagger";
import { Transform } from "class-transformer";
import { BaseVo } from "src/vos/base.dto";
import { RoleVo } from "../../role/vo/role.vo";
import { UserRoleVo } from "@/modules/auth/vo/user-role.vo";
const moment = require("moment");

export class UserVo extends BaseVo {
  @ApiProperty({ description: "用户编号" })
  @AutoMap()
  userId: string;

  @ApiProperty({ description: "用户名" })
  @AutoMap()
  userName: string;

  @ApiProperty({ description: "密码" })
  @AutoMap()
  password: string;

  @ApiProperty({ description: "头像" })
  @AutoMap()
  avatar: string;

  @ApiProperty({ description: "姓名" })
  @AutoMap()
  fullName: string;

  @ApiProperty({ description: "手机号" })
  @AutoMap()
  phone: string;

  @ApiProperty({ description: "邮箱" })
  @AutoMap()
  email: string;

  @ApiProperty({ description: "地址" })
  @AutoMap()
  address: string;

  @ApiProperty({ description: "创建时间" })
  @AutoMap()
  @Transform((createTime: any) =>
    moment(createTime.value).format("YYYY-MM-DD HH:mm:ss")
  )
  createTime: Date;

  @ApiProperty({ description: "备注" })
  @AutoMap()
  remark: string;

  @ApiProperty({ description: "是否删除" })
  @AutoMap()
  deleted: boolean;

  @ApiProperty({ description: "是否启用" })
  @AutoMap()
  enabled: boolean;

  // @ApiProperty({ description: '角色编号集合' })
  // @AutoMap()
  // roles: number[];

  @ApiProperty({ description: "角色" })
  @AutoMap()
  roles: RoleVo[];

  // @ApiProperty({ description: '角色编号集合' })
  // @AutoMap()
  // roleIds: number[];
}
