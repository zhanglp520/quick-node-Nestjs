import { Column, Entity, ManyToMany, JoinTable } from "typeorm";
import { BaseEntity } from "@/entities/base.entity";
import { ApiProperty } from "@nestjs/swagger";
import { Exclude, Transform } from "class-transformer";
import { Enabled } from "@/common/enums/enabled.enum";
import { Deleted } from "@/common/enums/deleted.enum";
import { OrderStatus } from "@/common/enums/order.status";

// eslint-disable-next-line @typescript-eslint/no-var-requires
const moment = require("moment");

@Entity("order_orders")
export class OrderEntity extends BaseEntity {
  @ApiProperty({ description: "订单编号" })
  @Column({ type: "varchar", name: "order_id" })
  orderId: string;

  @ApiProperty({ description: "订单名称" })
  @Column({ type: "varchar", name: "order_name" })
  orderName: string;

  @ApiProperty({ description: "图片" })
  @Column({ type: "varchar", name: "img_url" })
  imgUrl: string;

  @ApiProperty({ description: "介绍" })
  @Column({ type: "varchar" })
  intro: string;

  @ApiProperty({ description: "状态" })
  @Column({ type: "int", default: 0 })
  status: OrderStatus;

  @ApiProperty({ description: "删除" })
  @Column({ type: "int", default: 0 })
  deleted: Deleted;

  @ApiProperty({ description: "创建时间" })
  @Transform((createTime: any) => {
    console.log("createTime", createTime);

    return moment(createTime.value).format("YYYY-MM-DD HH:mm:ss");
  })
  @Column({ type: "datetime", name: "create_time" })
  createTime: Date;

  @ApiProperty({ description: "交付时间" })
  @Transform((deliveryTime: any) => {
    console.log("deliveryTime", deliveryTime);

    return moment(deliveryTime.value).format("YYYY-MM-DD HH:mm:ss");
  })
  @Column({ type: "datetime", name: "delivery_time" })
  deliveryTime: Date;

  @ApiProperty({ description: "备注" })
  @Column({ type: "varchar" })
  remark: string;
}
