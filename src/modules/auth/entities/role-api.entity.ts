import { BaseEntity } from "@/entities/base.entity";
import { ApiProperty } from "@nestjs/swagger";
import { Column, Entity } from "typeorm";

@Entity("per_role_apis")
export class RoleApiEntity extends BaseEntity {
  @ApiProperty({ description: "角色编号" })
  @Column({ type: "int", name: "role_id" })
  roleId: number;

  @ApiProperty({ description: "接口编号" })
  @Column({ type: "int", name: "api_id" })
  apiId: number;
}
