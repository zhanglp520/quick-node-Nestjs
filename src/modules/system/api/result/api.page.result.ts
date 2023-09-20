import { ApiProperty } from "@nestjs/swagger";
import { ApiEntity } from "../entities/api.entity";

export class ApiPageResult {
  @ApiProperty({ description: "承载数据", type: () => [ApiEntity] })
  payload: ApiEntity[];

  @ApiProperty({ description: "总条数" })
  total: number;
}
