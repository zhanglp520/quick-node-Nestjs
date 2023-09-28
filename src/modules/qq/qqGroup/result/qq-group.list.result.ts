import { ApiProperty } from "@nestjs/swagger";
import { QQGroupEntity } from "../entities/qq-group.entity";
import { Result } from "@/common/tools/result";

export class QQGroupListResult extends Result {
  @ApiProperty({ description: "数据", type: () => [QQGroupEntity] })
  data: QQGroupEntity[];
}
