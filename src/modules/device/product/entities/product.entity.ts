import { Transform } from "class-transformer";
import { BaseEntity, Column, Entity, PrimaryGeneratedColumn } from "typeorm";
const moment = require("moment");

@Entity("dev_products")
export class ProductEntity extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;
  @Column({ type: "varchar", name: "product_id" })
  productId: string;
  @Column({ type: "varchar", name: "product_name" })
  productName: string;
  @Column({ type: "int", name: "product_type" })
  productType: number;
  @Column({ type: "int", name: "device_type" })
  deviceType: number;
  @Column({ type: "int", default: 0 })
  enabled: boolean;
  @Transform((createTime: any) =>
    moment(createTime.value).format("YYYY-MM-DD HH:mm:ss")
  )
  @Column({ type: "datetime", name: "create_time", default: new Date() })
  createTime: Date;
  @Column({ type: "varchar" })
  remark: string;
}
