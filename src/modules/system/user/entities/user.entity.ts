import {
  Column,
  Entity,
  PrimaryGeneratedColumn,
  PrimaryColumnCannotBeNullableError,
  OneToMany,
  ManyToMany,
  JoinTable,
  //   JoinTable,
  //   ManyToMany,
} from "typeorm";
import { RoleEntity } from "../../role/entities/role.entity";
import { UserRoleEntity } from "@/modules/auth/entities/user-role.entity";
import { BaseEntity } from "@/entities/base.entity";
import { ApiProperty } from "@nestjs/swagger";
import { Transform } from "class-transformer";
import { Enabled } from "@/common/enums/enabled.enum";
import { Deleted } from "@/common/enums/deleted.enum";

// eslint-disable-next-line @typescript-eslint/no-var-requires
const moment = require("moment");

@Entity("sys_users")
export class UserEntity extends BaseEntity {
  @ApiProperty({ description: "用户编号" })
  @Column({ type: "varchar", name: "user_id" })
  userId: string;

  @ApiProperty({ description: "用户名称" })
  @Column({ type: "varchar", name: "user_name" })
  userName: string;

  @ApiProperty({ description: "密码" })
  @Column({ type: "varchar", default: "e10adc3949ba59abbe56e057f20f883e" })
  password: string;

  @ApiProperty({ description: "头像" })
  @Column({ type: "varchar" })
  avatar: string;

  @ApiProperty({ description: "姓名" })
  @Column({ type: "varchar", name: "full_name" })
  fullName: string;

  @ApiProperty({ description: "手机号" })
  @Column({ type: "varchar" })
  phone: string;

  @ApiProperty({ description: "邮箱" })
  @Column({ type: "varchar" })
  email: string;

  @ApiProperty({ description: "地址" })
  @Column({ type: "varchar" })
  address: string;

  @ApiProperty({ description: "删除" })
  @Column({ type: "int", default: 0 })
  deleted: Deleted;

  @ApiProperty({ description: "启用" })
  @Column({ type: "int", default: 1 })
  enabled: Enabled;

  @ApiProperty({ description: "创建时间" })
  @Transform((createTime: any) =>
    moment(createTime.value).format("YYYY-MM-DD HH:mm:ss")
  )
  @Column({ type: "datetime", name: "create_time" })
  createTime: Date;

  @ApiProperty({ description: "备注" })
  @Column({ type: "varchar" })
  remark: string;

  // @AutoMap()
  // @OneToMany(() => UserRoleEntity, (ur) => ur.user)
  // @JoinTable({
  //   name: 'per_user_roles',
  // })
  // userRoles: UserRoleEntity[];

  // @AutoMap()
  // roles: number[];

  @ApiProperty({ description: "角色" })
  @ManyToMany(() => RoleEntity, (role) => role.users)
  // @JoinTable()
  @JoinTable({
    name: "per_user_roles",
    joinColumns: [{ name: "user_id" }],
    inverseJoinColumns: [{ name: "role_id" }],
  })
  // @Column({ type: 'int', default: 1 })
  @ApiProperty({ description: "消息" })
  roles: RoleEntity[];

  // @AutoMap()
  // roleIds: number[];
}
