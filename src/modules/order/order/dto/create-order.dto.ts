import { ApiProperty, ApiPropertyOptional } from "@nestjs/swagger";
import { IsNotEmpty } from "class-validator";

export class CreateOrderDto {
  @ApiProperty({ description: "订单名称", type: "String", required: true })
  @IsNotEmpty({ message: "参数错误,订单名不能为空." })
  orderName: string;

  @ApiPropertyOptional({ description: "订单简介", required: true })
  @IsNotEmpty({ message: "参数错误,订单简介不能为空." })
  intro: string;

  @ApiPropertyOptional({ description: "订单图片", required: true })
  @IsNotEmpty({ message: "参数错误,订单图片不能为空." })
  imgUrl: string;

  @ApiPropertyOptional({ description: "交付时间", required: true })
  @IsNotEmpty({ message: "参数错误,交付时间不能为空." })
  deliveryTime: string;

  @ApiPropertyOptional({ description: "备注" })
  remark: string;
}
