import { ApiPropertyOptional } from "@nestjs/swagger";
import { SearchDto } from "src/dtos/search.dto";

export class SearchQQFrendDto extends SearchDto {
  @ApiPropertyOptional({ description: "订单编号" })
  orderId: string;
  @ApiPropertyOptional({ description: "内容" })
  content: string;
  @ApiPropertyOptional({ description: "状态" })
  status: string;
}
