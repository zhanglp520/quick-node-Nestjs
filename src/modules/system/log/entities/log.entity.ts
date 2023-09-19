import { BaseEntity } from "@/entities/base.entity";
import { ApiProperty } from "@nestjs/swagger";
import { Transform } from "class-transformer";
import { Column, Entity } from "typeorm";

// eslint-disable-next-line @typescript-eslint/no-var-requires
const moment = require("moment");

@Entity("sys_logs")
export class LogEntity extends BaseEntity {
  @ApiProperty({ description: "日志类型" })
  @Column({ type: "int", name: "type" })
  type: string;

  @ApiProperty({ description: "ip地址" })
  @Column({ type: "varchar", name: "ip" })
  ip: string;

  @ApiProperty({ description: "请求" })
  @Column({ type: "varchar", name: "request" })
  request: string;

  @ApiProperty({ description: "响应" })
  @Column({ type: "varchar", name: "response" })
  response: string;

  @ApiProperty({ description: "异常" })
  @Column({ type: "varchar", name: "exception" })
  exception: string;

  @ApiProperty({ description: "时长" })
  @Column({ type: "float", name: "duration" })
  duration: number;

  @ApiProperty({ description: "操作人编号" })
  @Column({ type: "varchar", name: "operate_id" })
  operateId: string;

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
