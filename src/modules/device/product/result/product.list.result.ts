import { ApiProperty } from "@nestjs/swagger";
import { ProductEntity } from "../entities/product.entity";
import { Result } from "@/common/tools/result";

export class ProductListResult extends Result {
  @ApiProperty({ description: "数据", type: () => [ProductEntity] })
  data: ProductEntity[];
}
