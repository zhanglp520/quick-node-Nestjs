import { Column, Entity, JoinColumn, ManyToOne } from "typeorm";
import { Transform } from "class-transformer";
import { ProductEntity } from "../../product/entities/product.entity";
import { BaseEntity } from "@/entities/base.entity";
import { ApiProperty } from "@nestjs/swagger";
import { Enabled } from "@/common/enums/enabled.enum";

// eslint-disable-next-line @typescript-eslint/no-var-requires
const moment = require("moment");

@Entity("dev_devices")
export class DeviceEntity extends BaseEntity {
  @ApiProperty({ description: "设备编号" })
  @Column({ type: "varchar", name: "device_id" })
  deviceId: string;

  @ApiProperty({ description: "设备名称" })
  @Column({ type: "varchar", name: "device_name" })
  deviceName: string;

  @ApiProperty({ description: "产品编号" })
  @Column({ type: "int", name: "product_id" })
  productId: number;

  @ApiProperty({ description: "启用" })
  @Column({ type: "int", default: 0 })
  enabled: Enabled;

  @ApiProperty({ description: "状态" })
  @Column({ type: "int", default: 0 })
  status: boolean;

  @ApiProperty({ description: "创建时间" })
  @Transform((createTime: any) =>
    moment(createTime.value).format("YYYY-MM-DD HH:mm:ss")
  )
  @Column({ type: "datetime", name: "create_time" })
  createTime: Date;

  @ApiProperty({ description: "备注" })
  @Column({ type: "varchar" })
  remark: string;

  @ApiProperty({ description: "产品" })
  @ManyToOne(() => ProductEntity, (product) => product.devices)
  @JoinColumn({ name: "product_id" })
  product: ProductEntity;
}
