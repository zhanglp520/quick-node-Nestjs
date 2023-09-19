import { ApiProperty } from "@nestjs/swagger";
import { DictionaryEntity } from "../entities/dictionary.entity";

export class DictionaryPageResult {
  @ApiProperty({
    name: "status",
    type: Number,
    description: "状态:0-成功,1-失败,2-异常",
  })
  status: number;

  @ApiProperty({ description: "消息" })
  msg: string;

  @ApiProperty({ description: "承载数据", type: () => [DictionaryEntity] })
  payload: DictionaryEntity[];

  @ApiProperty({ description: "总条数" })
  total: number;
}
