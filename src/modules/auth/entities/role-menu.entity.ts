import { BaseEntity } from "@/entities/base.entity";
import { ApiProperty } from "@nestjs/swagger";
import { Column, Entity } from "typeorm";

@Entity("per_role_menus")
export class RoleMenuEntity extends BaseEntity {
  @ApiProperty({ description: "角色编号" })
  @Column({ type: "int", name: "role_id" })
  roleId: number;

  @ApiProperty({ description: "菜单编号" })
  @Column({ type: "int", name: "menu_id" })
  menuId: number;
}
