import { ApiProperty } from "@nestjs/swagger";
import { OrderEntity } from "../entities/order.entity";

export class OrderResult {
  @ApiProperty({ description: "数据", type: () => OrderEntity })
  data: OrderEntity;
}
