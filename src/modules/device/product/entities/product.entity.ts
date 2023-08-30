import { Transform } from "class-transformer";
import { BaseEntity, Column, Entity, PrimaryGeneratedColumn } from "typeorm";
// eslint-disable-next-line @typescript-eslint/no-var-requires
const moment = require("moment");

@Entity("dev_products")
export class ProductEntity extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;
  @Column({ type: "varchar", name: "product_id" })
  productId: string;
  @Column({ type: "varchar", name: "product_name" })
  productName: string;
  @Column({ type: "int", name: "category_mode" })
  categoryMode: number;
  @Column({ type: "int", name: "product_type" })
  productType: number;
  @Column({ type: "int", name: "device_type" })
  deviceType: number;
  @Column({ type: "int", name: "access_protocol" })
  accessProtocol: number;
  @Column({ type: "int", name: "data_protocol" })
  dataProtocol: number;
  @Column({ type: "int", name: "network_mode" })
  networkMode: number;
  @Column({ type: "varchar", name: "access_key" })
  accessKey: string;
  @Column({ type: "varchar", name: "product_key" })
  productKey: string;
  @Column({ type: "varchar", name: "product_secret" })
  productSecret: string;
  @Column({ type: "int", default: 0 })
  enabled: boolean;
  @Column({ type: "int", default: 0 })
  published: number;
  @Transform((time: any) => moment(time.value).format("YYYY-MM-DD HH:mm:ss"))
  @Column({ type: "datetime", name: "create_time", default: new Date() })
  createTime: Date;
  @Transform((time: any) => moment(time.value).format("YYYY-MM-DD HH:mm:ss"))
  @Column({ type: "datetime", name: "update_time", default: new Date() })
  updateTime: Date;
  @Transform((time: any) => moment(time.value).format("YYYY-MM-DD HH:mm:ss"))
  @Column({ type: "datetime", name: "publish_time", default: new Date() })
  publishTime: Date;
  @Transform((time: any) => moment(time.value).format("YYYY-MM-DD HH:mm:ss"))
  @Column({ type: "datetime", name: "unpublish_time", default: new Date() })
  unpublishTime: Date;
  @Column({ type: "varchar" })
  remark: string;
}
