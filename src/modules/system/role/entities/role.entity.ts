import { AutoMap } from "@automapper/classes";
import {
  BaseEntity,
  Column,
  Entity,
  JoinTable,
  ManyToMany,
  OneToMany,
  PrimaryGeneratedColumn,
} from "typeorm";
import { UserEntity } from "@/modules/system/user/entities/user.entity";
import { UserRoleEntity } from "@/modules/auth/entities/user-role.entity";
import { ApiEntity } from "@/modules/system/api/entities/api.entity";

@Entity("sys_roles")
export class RoleEntity extends BaseEntity {
  @AutoMap()
  @PrimaryGeneratedColumn()
  id: number;

  @AutoMap()
  @Column({ type: "varchar", name: "role_id" })
  roleId: string;

  @AutoMap()
  @Column({ type: "varchar", name: "role_name" })
  roleName: string;

  @AutoMap()
  @Column({ type: "int", name: "dept_id" })
  deptId: number;

  // @AutoMap()
  // @OneToMany(() => UserRoleEntity, (ur) => ur.role)
  // @JoinTable({
  //   name: 'per_user_roles',
  // })
  // userRoles: UserRoleEntity[];

  @AutoMap()
  @ManyToMany(() => UserEntity, (user) => user.roles)
  users: UserEntity[];

  @AutoMap()
  @ManyToMany(() => ApiEntity, (api) => api.roles)
  apis: ApiEntity[];
}
