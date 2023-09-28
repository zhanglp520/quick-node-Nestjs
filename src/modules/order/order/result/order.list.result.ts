import { ApiProperty } from "@nestjs/swagger";
import { OrderEntity } from "../entities/order.entity";
import { Result } from "@/common/tools/result";

export class OrderListResult extends Result {
  @ApiProperty({ description: "数据", type: () => [OrderEntity] })
  data: OrderEntity[];
}
