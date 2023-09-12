import { AutoMap } from "@automapper/classes";
import { BaseEntity, Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity("dev_products")
export class ProductEntity extends BaseEntity {
  @AutoMap()
  @PrimaryGeneratedColumn()
  id: number;

  @AutoMap()
  @Column({ type: "varchar", name: "product_id" })
  productId: string;

  @AutoMap()
  @Column({ type: "varchar", name: "product_name" })
  productName: string;

  @AutoMap()
  @Column({ type: "int", name: "category_mode" })
  categoryMode: number;

  @AutoMap()
  @Column({ type: "int", name: "product_type" })
  productType: number;

  @AutoMap()
  @Column({ type: "int", name: "device_type" })
  deviceType: number;

  @AutoMap()
  @Column({ type: "int", name: "access_protocol" })
  accessProtocol: number;

  @AutoMap()
  @Column({ type: "int", name: "data_protocol" })
  dataProtocol: number;

  @AutoMap()
  @Column({ type: "int", name: "network_mode" })
  networkMode: number;

  @AutoMap()
  @Column({ type: "varchar", name: "access_key" })
  accessKey: string;

  @AutoMap()
  @Column({ type: "varchar", name: "product_key" })
  productKey: string;

  @AutoMap()
  @Column({ type: "varchar", name: "product_secret" })
  productSecret: string;

  @AutoMap()
  @Column({ type: "int", default: 0 })
  enabled: boolean;

  @AutoMap()
  @Column({ type: "int", default: 0 })
  published: number;

  @AutoMap()
  @Column({ type: "datetime", name: "create_time", default: new Date() })
  createTime: Date;

  @AutoMap()
  @Column({ type: "datetime", name: "update_time", default: new Date() })
  updateTime: Date;

  @AutoMap()
  @Column({ type: "datetime", name: "publish_time", default: new Date() })
  publishTime: Date;

  @AutoMap()
  @Column({ type: "datetime", name: "unpublish_time", default: new Date() })
  unpublishTime: Date;

  @AutoMap()
  @Column({ type: "varchar" })
  remark: string;
}
