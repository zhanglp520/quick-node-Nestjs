import { AutoMap } from "@automapper/classes";
import { BaseEntity, Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity("qq_groups")
export class QQGroupEntity extends BaseEntity {
  @AutoMap()
  @PrimaryGeneratedColumn({ type: "int" })
  id?: number;

  @AutoMap()
  @Column({ type: "varchar", name: "order_id" })
  orderId: string;

  @AutoMap()
  @Column({ type: "text" })
  content: string;

  @AutoMap()
  @Column({ type: "varchar" })
  keyword: string;

  @AutoMap()
  @Column({ type: "int" })
  status: number;

  @AutoMap()
  @Column({ type: "timestamp", name: "create_time", default: new Date() })
  createTime: Date;

  @AutoMap()
  @Column({ type: "text" })
  remark: string;
}
