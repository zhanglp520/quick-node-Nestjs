import { BaseEntity } from "@/entities/base.entity";
import { RoleEntity } from "@/modules/system/role/entities/role.entity";
import { UserEntity } from "@/modules/system/user/entities/user.entity";
import { ApiProperty } from "@nestjs/swagger";
import {
  Column,
  Entity,
  JoinColumn,
  JoinTable,
  ManyToOne,
  PrimaryGeneratedColumn,
} from "typeorm";

@Entity("per_user_roles")
export class UserRoleEntity extends BaseEntity {
  @ApiProperty({ description: "用户编号" })
  @Column({ type: "int", name: "user_id" })
  userId: number;

  @ApiProperty({ description: "角色编号" })
  @Column({ type: "int", name: "role_id" })
  roleId: number;

  // @AutoMap()
  // @ManyToOne(() => UserEntity, (user) => user.userRoles)
  // @JoinTable({
  //   name: 'per_user_roles',
  // })
  // @JoinColumn({ name: 'user_id' })
  // user: UserEntity;

  // @AutoMap()
  // @ManyToOne(() => RoleEntity, (role) => role.userRoles)
  // @JoinTable({
  //   name: 'per_user_roles',
  // })
  // @JoinColumn({ name: 'role_id' })
  // role: RoleEntity;
}
