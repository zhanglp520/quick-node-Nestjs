import { ApiProperty, ApiPropertyOptional } from "@nestjs/swagger";

export class CreateQQGroupDto {
  @ApiProperty({ description: "订单编号" })
  orderId: string;

  @ApiProperty({ description: "内容" })
  content: string;

  @ApiProperty({ description: "关键字" })
  keyword: string;

  @ApiProperty({ description: "状态" })
  status: string;

  @ApiPropertyOptional({ description: "备注" })
  remark: string;
}
