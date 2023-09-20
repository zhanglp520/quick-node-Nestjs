import { ApiProperty } from "@nestjs/swagger";
import { ApiEntity } from "../entities/api.entity";
import { Result } from "@/common/tools/result";

export class ApiResult extends Result {
  @ApiProperty({ description: "数据", type: () => ApiEntity })
  data: ApiEntity;
}
