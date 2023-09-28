import { ApiProperty } from "@nestjs/swagger";
import { OrderEntity } from "../entities/order.entity";

export class OrderPageResult {
  @ApiProperty({ description: "承载数据", type: () => [OrderEntity] })
  payload: OrderEntity[];

  @ApiProperty({ description: "总条数" })
  total: number;
}
