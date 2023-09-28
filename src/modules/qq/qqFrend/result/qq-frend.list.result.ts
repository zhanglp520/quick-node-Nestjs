import { ApiProperty } from "@nestjs/swagger";
import { QQFrendEntity } from "../entities/qq-frend.entity";
import { Result } from "@/common/tools/result";

export class QQFrendListResult extends Result {
  @ApiProperty({ description: "数据", type: () => [QQFrendEntity] })
  data: QQFrendEntity[];
}
