import { AutoMap } from "@automapper/classes";
import { Transform } from "class-transformer";
import { BaseEntity, Column, Entity, PrimaryGeneratedColumn } from "typeorm";
const moment = require("moment");

@Entity("sys_logs")
export class LogEntity extends BaseEntity {
  @AutoMap()
  @PrimaryGeneratedColumn()
  id: number;

  @AutoMap()
  @Column({ type: "int", name: "type" })
  type: string;

  @AutoMap()
  @Column({ type: "varchar", name: "ip" })
  ip: string;

  @AutoMap()
  @Column({ type: "varchar", name: "request" })
  request: string;

  @AutoMap()
  @Column({ type: "varchar", name: "response" })
  response: string;

  @AutoMap()
  @Column({ type: "varchar", name: "exception" })
  exception: string;

  @AutoMap()
  @Column({ type: "float", name: "duration" })
  duration: number;

  @AutoMap()
  @Column({ type: "varchar", name: "operate_id" })
  operateId: string;

  @AutoMap()
  @Transform((createTime: any) =>
    moment(createTime.value).format("YYYY-MM-DD HH:mm:ss")
  )
  @Column({ type: "datetime", name: "create_time" })
  createTime: Date;
}
