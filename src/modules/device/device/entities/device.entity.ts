import { BaseEntity, Column, Entity, PrimaryGeneratedColumn } from "typeorm";
import { Transform } from "class-transformer";
const moment = require("moment");

@Entity("dev_devices")
export class DeviceEntity extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;
  @Column({ type: "varchar", name: "device_id" })
  deviceId: string;
  @Column({ type: "varchar", name: "device_name" })
  deviceName: string;
  @Column({ type: "int", name: "product_id" })
  productId: number;
  @Column({ type: "int", default: 0 })
  enabled: boolean;
  @Column({ type: "int", default: 0 })
  status: boolean;
  @Transform((createTime: any) =>
    moment(createTime.value).format("YYYY-MM-DD HH:mm:ss")
  )
  @Column({ type: "datetime", name: "create_time", default: new Date() })
  createTime: Date;
  @Column({ type: "varchar" })
  remark: string;
}
