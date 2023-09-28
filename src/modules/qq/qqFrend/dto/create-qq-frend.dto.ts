import { ApiProperty, ApiPropertyOptional } from "@nestjs/swagger";

export class CreateQQFrendDto {
  @ApiProperty({ description: "订单编号" })
  orderId: string;

  @ApiProperty({ description: "内容" })
  content: string;

  @ApiProperty({ description: "状态" })
  status: string;

  @ApiPropertyOptional({ description: "备注" })
  remark: string;
}
