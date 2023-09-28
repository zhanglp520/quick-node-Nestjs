import { ApiProperty } from "@nestjs/swagger";
import { QQGroupEntity } from "../entities/qq-group.entity";

export class QQGroupResult {
  @ApiProperty({ description: "数据", type: () => QQGroupEntity })
  data: QQGroupEntity;
}
