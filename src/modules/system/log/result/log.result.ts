import { ApiProperty } from "@nestjs/swagger";
import { LogEntity } from "../entities/log.entity";
import { Result } from "@/common/tools/result";

export class LogResult extends Result {
  @ApiProperty({ description: "数据", type: () => LogEntity })
  data: LogEntity;
}
