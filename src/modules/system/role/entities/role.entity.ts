import { Column, Entity, ManyToMany } from "typeorm";
import { UserEntity } from "@/modules/system/user/entities/user.entity";
import { ApiEntity } from "@/modules/system/api/entities/api.entity";
import { ApiProperty } from "@nestjs/swagger";
import { BaseEntity } from "@/entities/base.entity";
import { Transform } from "class-transformer";

// eslint-disable-next-line @typescript-eslint/no-var-requires
const moment = require("moment");

@Entity("sys_roles")
export class RoleEntity extends BaseEntity {
  @ApiProperty({ description: "角色编号" })
  @Column({ type: "varchar", name: "role_id" })
  roleId: string;

  @ApiProperty({ description: "角色名称" })
  @Column({ type: "varchar", name: "role_name" })
  roleName: string;

  @ApiProperty({ description: "部门编号" })
  @Column({ type: "int", name: "dept_id" })
  deptId: number;

  @ApiProperty({ description: "创建时间" })
  @Transform((createTime: any) => {
    console.log("createTime", createTime);

    return moment(createTime.value).format("YYYY-MM-DD HH:mm:ss");
  })
  @Column({ type: "datetime", name: "create_time" })
  createTime: Date;

  @ApiProperty({ description: "备注" })
  @Column({ type: "varchar" })
  remark: string;

  // @AutoMap()
  // @OneToMany(() => UserRoleEntity, (ur) => ur.role)
  // @JoinTable({
  //   name: 'per_user_roles',
  // })
  // userRoles: UserRoleEntity[];

  @ApiProperty({ description: "用户" })
  @ManyToMany(() => UserEntity, (user) => user.roles)
  users: UserEntity[];

  @ApiProperty({ description: "接口" })
  @ManyToMany(() => ApiEntity, (api) => api.roles)
  apis: ApiEntity[];
}
