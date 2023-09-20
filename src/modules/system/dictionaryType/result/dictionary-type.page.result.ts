import { ApiProperty } from "@nestjs/swagger";
import { DictionaryTypeEntity } from "../entities/dictionary-type.entity";

export class DictionaryTypePageResult {
  @ApiProperty({ description: "承载数据", type: () => [DictionaryTypeEntity] })
  payload: DictionaryTypeEntity[];

  @ApiProperty({ description: "总条数" })
  total: number;
}
