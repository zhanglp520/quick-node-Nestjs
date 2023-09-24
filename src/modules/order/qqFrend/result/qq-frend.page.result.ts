import { ApiProperty } from "@nestjs/swagger";
import { QQFrendEntity } from "../entities/qq-frend.entity";

export class QQFrendPageResult {
  @ApiProperty({ description: "承载数据", type: () => [QQFrendEntity] })
  payload: QQFrendEntity[];

  @ApiProperty({ description: "总条数" })
  total: number;
}
