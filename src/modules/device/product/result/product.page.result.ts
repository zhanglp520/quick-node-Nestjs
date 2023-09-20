import { ApiProperty } from "@nestjs/swagger";
import { ProductEntity } from "../entities/product.entity";

export class ProductPageResult {
  @ApiProperty({ description: "承载数据", type: () => [ProductEntity] })
  payload: ProductEntity[];

  @ApiProperty({ description: "总条数" })
  total: number;
}
