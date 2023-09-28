import { ApiProperty } from "@nestjs/swagger";
import { QQGroupEntity } from "../entities/qq-group.entity";

export class QQGroupPageResult {
  @ApiProperty({ description: "承载数据", type: () => [QQGroupEntity] })
  payload: QQGroupEntity[];

  @ApiProperty({ description: "总条数" })
  total: number;
}
