import { AutoMap } from "@automapper/classes";
import { ApiProperty } from "@nestjs/swagger";
import { Transform } from "class-transformer";
import { BaseVo } from "src/vos/base.dto";
// eslint-disable-next-line @typescript-eslint/no-var-requires
const moment = require("moment");

export class QQGroupVo extends BaseVo {
  @ApiProperty({ description: "订单编号" })
  @AutoMap()
  orderId: string;

  @ApiProperty({ description: "内容" })
  @AutoMap()
  content: string;

  @ApiProperty({ description: "关键字" })
  @AutoMap()
  keyword: string;

  @ApiProperty({ description: "状态" })
  @AutoMap()
  status: number;

  @ApiProperty({ description: "创建时间" })
  @AutoMap()
  @Transform((createTime: any) =>
    moment(createTime.value).format("YYYY-MM-DD HH:mm:ss")
  )
  createTime: Date;

  @ApiProperty({ description: "备注" })
  @AutoMap()
  remark: string;
}
