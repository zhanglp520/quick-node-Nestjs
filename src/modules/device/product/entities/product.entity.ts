import { Column, Entity, OneToMany } from "typeorm";
import { DeviceEntity } from "../../device/entities/device.entity";
import { BaseEntity } from "@/entities/base.entity";
import { ApiProperty } from "@nestjs/swagger";
import { Transform } from "class-transformer";
import { Enabled } from "@/common/enums/enabled.enum";
import { Published } from "@/common/enums/published.enum";

// eslint-disable-next-line @typescript-eslint/no-var-requires
const moment = require("moment");

@Entity("dev_products")
export class ProductEntity extends BaseEntity {
  @ApiProperty({ description: "产品编号" })
  @Column({ type: "varchar", name: "product_id" })
  productId: string;

  @ApiProperty({ description: "产品名称" })
  @Column({ type: "varchar", name: "product_name" })
  productName: string;

  @ApiProperty({ description: "品类方式" })
  @Column({ type: "int", name: "category_mode" })
  categoryMode: number;

  @ApiProperty({ description: "产品分类" })
  @Column({ type: "int", name: "product_type" })
  productType: number;

  @ApiProperty({ description: "设备类型" })
  @Column({ type: "int", name: "device_type" })
  deviceType: number;

  @ApiProperty({ description: "接入协议" })
  @Column({ type: "int", name: "access_protocol" })
  accessProtocol: number;

  @ApiProperty({ description: "数据协议" })
  @Column({ type: "int", name: "data_protocol" })
  dataProtocol: number;

  @ApiProperty({ description: "联网方式" })
  @Column({ type: "int", name: "network_mode" })
  networkMode: number;

  @ApiProperty({ description: "公钥" })
  @Column({ type: "varchar", name: "access_key" })
  accessKey: string;

  @ApiProperty({ description: "产品秘钥" })
  @Column({ type: "varchar", name: "product_key" })
  productKey: string;

  @ApiProperty({ description: "产品私密" })
  @Column({ type: "varchar", name: "product_secret" })
  productSecret: string;

  @ApiProperty({ description: "启用" })
  @Column({ type: "int", default: 0 })
  enabled: Enabled;

  @ApiProperty({ description: "发布" })
  @Column({ type: "int", default: 0 })
  published: Published;

  @ApiProperty({ description: "创建时间" })
  @Transform((createTime: any) =>
    moment(createTime.value).format("YYYY-MM-DD HH:mm:ss")
  )
  @Column({ type: "datetime", name: "create_time" })
  createTime: Date;

  @ApiProperty({ description: "修改时间" })
  @Column({ type: "datetime", name: "update_time", default: new Date() })
  updateTime: Date;

  @ApiProperty({ description: "发布时间" })
  @Column({ type: "datetime", name: "publish_time", default: new Date() })
  publishTime: Date;

  @ApiProperty({ description: "撤销发布时间" })
  @Column({ type: "datetime", name: "unpublish_time", default: new Date() })
  unpublishTime: Date;

  @ApiProperty({ description: "备注" })
  @Column({ type: "varchar" })
  remark: string;

  @ApiProperty({ description: "设备列表" })
  @OneToMany(() => DeviceEntity, (device) => device.product)
  devices: DeviceEntity[];
}
