import { ApiProperty } from "@nestjs/swagger";
import { ProductEntity } from "../entities/product.entity";

export class ProductResult {
  @ApiProperty({ description: "数据", type: () => ProductEntity })
  data: ProductEntity;
}
