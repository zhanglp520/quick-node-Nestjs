import {
  Column,
  Entity,
  JoinColumn,
  JoinTable,
  ManyToOne,
  PrimaryGeneratedColumn,
} from "typeorm";
import { Transform } from "class-transformer";
import { ProductEntity } from "../../product/entities/product.entity";
import { AutoMap } from "@automapper/classes";
import { BaseEntity } from "@/entities/base.entity";
// eslint-disable-next-line @typescript-eslint/no-var-requires
const moment = require("moment");

// extends BaseEntity
@Entity("dev_devices")
export class DeviceEntity {
  @PrimaryGeneratedColumn()
  @AutoMap()
  id: number;

  @AutoMap()
  @Column({ type: "varchar", name: "device_id" })
  deviceId: string;

  @AutoMap()
  @Column({ type: "varchar", name: "device_name" })
  deviceName: string;

  @AutoMap()
  @Column({ type: "int", name: "product_id" })
  productId: number;

  @AutoMap()
  @Column({ type: "int", default: 0 })
  enabled: boolean;

  @AutoMap()
  @Column({ type: "int", default: 0 })
  status: boolean;
  @Transform((createTime: any) =>
    moment(createTime.value).format("YYYY-MM-DD HH:mm:ss")
  )
  @Column({ type: "datetime", name: "create_time", default: new Date() })
  createTime: Date;

  @AutoMap()
  @Column({ type: "varchar" })
  remark: string;

  @AutoMap()
  @ManyToOne(() => ProductEntity, (product) => product.devices)
  @JoinColumn({ name: "product_id" })
  product: any;
}
