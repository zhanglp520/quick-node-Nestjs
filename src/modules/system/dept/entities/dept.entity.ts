import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";
import { BaseEntity } from "@/entities/base.entity";
import { ApiProperty } from "@nestjs/swagger";
import { Transform } from "class-transformer";

// eslint-disable-next-line @typescript-eslint/no-var-requires
const moment = require("moment");

@Entity("sys_depts")
export class DeptEntity extends BaseEntity {
  @ApiProperty({ description: "部门编号" })
  @Column({ type: "varchar", name: "dept_id" })
  deptId: string;

  @ApiProperty({ description: "部门名称" })
  @Column({ type: "varchar", name: "dept_name" })
  deptName: string;

  @ApiProperty({ description: "父级部门" })
  @Column({ type: "varchar", name: "p_id" })
  pId: string;

  @ApiProperty({ description: "创建时间" })
  @Transform((createTime: any) =>
    moment(createTime.value).format("YYYY-MM-DD HH:mm:ss")
  )
  @Column({ type: "datetime", name: "create_time" })
  createTime: Date;

  @ApiProperty({ description: "备注" })
  @Column({ type: "varchar" })
  remark: string;
}
