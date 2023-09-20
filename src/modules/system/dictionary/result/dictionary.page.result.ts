import { ApiProperty } from "@nestjs/swagger";
import { DictionaryEntity } from "../entities/dictionary.entity";

export class DictionaryPageResult {
  @ApiProperty({ description: "承载数据", type: () => [DictionaryEntity] })
  payload: DictionaryEntity[];

  @ApiProperty({ description: "总条数" })
  total: number;
}
