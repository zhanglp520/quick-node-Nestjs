import { ApiProperty } from "@nestjs/swagger";
import { LogEntity } from "../entities/log.entity";

export class LogPageResult {
  @ApiProperty({ description: "承载数据", type: () => [LogEntity] })
  payload: LogEntity[];

  @ApiProperty({ description: "总条数" })
  total: number;
}
