import { ApiProperty } from "@nestjs/swagger";
import { QQFrendEntity } from "../entities/qq-frend.entity";

export class QQFrendResult {
  @ApiProperty({ description: "数据", type: () => QQFrendEntity })
  data: QQFrendEntity;
}
