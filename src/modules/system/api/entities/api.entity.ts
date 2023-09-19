import { Transform } from "class-transformer";
import { Column, Entity, JoinTable, ManyToMany } from "typeorm";
import { RoleEntity } from "../../role/entities/role.entity";
import { ApiProperty } from "@nestjs/swagger";
import { BaseEntity } from "@/entities/base.entity";

// eslint-disable-next-line @typescript-eslint/no-var-requires
const moment = require("moment");

@Entity("sys_apis")
export class ApiEntity extends BaseEntity {
  @ApiProperty({ description: "接口编号" })
  @Column({ type: "varchar", name: "api_id" })
  apiId: string;

  @ApiProperty({ description: "接口名称" })
  @Column({ type: "varchar", name: "api_name" })
  apiName: string;

  @ApiProperty({ description: "接口路径" })
  @Column({ type: "varchar", name: "api_path" })
  apiPath: string;

  @ApiProperty({ description: "创建时间" })
  @Transform((createTime: any) =>
    moment(createTime.value).format("YYYY-MM-DD HH:mm:ss")
  )
  @Column({ type: "datetime", name: "create_time" })
  createTime: Date;

  @ApiProperty({ description: "备注" })
  @Column({ type: "varchar" })
  remark: string;

  @ApiProperty({ description: "消息" })
  @ManyToMany(() => RoleEntity, (role) => role.apis)
  // @JoinTable()
  @JoinTable({
    name: "per_role_apis",
    joinColumns: [{ name: "api_id" }],
    inverseJoinColumns: [{ name: "role_id" }],
  })
  // @Column({ type: 'int', default: 1 })
  @ApiProperty({ description: "消息" })
  roles: RoleEntity[];
}
