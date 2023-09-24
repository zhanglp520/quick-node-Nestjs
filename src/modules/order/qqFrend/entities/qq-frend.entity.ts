import { BaseEntity } from "@/entities/base.entity";
import { ApiProperty } from "@nestjs/swagger";
import { Transform } from "class-transformer";
import { Column, Entity } from "typeorm";

// eslint-disable-next-line @typescript-eslint/no-var-requires
const moment = require("moment");

@Entity("qq_frends")
export class QQFrendEntity extends BaseEntity {
  @ApiProperty({ description: "订单编号" })
  @Column({ type: "varchar", name: "order_id" })
  orderId: string;

  @ApiProperty({ description: "内容" })
  @Column({ type: "text" })
  content: string;

  @ApiProperty({ description: "状态" })
  @Column({ type: "int" })
  status: number;

  @ApiProperty({ description: "创建时间" })
  @Transform((createTime: any) => {
    console.log("createTime", createTime);

    return moment(createTime.value).format("YYYY-MM-DD HH:mm:ss");
  })
  @Column({ type: "datetime", name: "create_time" })
  createTime: Date;

  @ApiProperty({ description: "备注" })
  @Column({ type: "varchar" })
  remark: string;
}
