import { ApiProperty } from "@nestjs/swagger";
import { SearchDto } from "src/dtos/search.dto";

export class SearchLogDto extends SearchDto {
  @ApiProperty({ description: "类型" })
  type: number;
}
