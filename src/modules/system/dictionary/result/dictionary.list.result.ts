import { ApiProperty } from "@nestjs/swagger";
import { DictionaryEntity } from "../entities/dictionary.entity";
import { Result } from "@/common/tools/result";

export class DictionaryListResult extends Result {
  @ApiProperty({ description: "数据", type: () => [DictionaryEntity] })
  data: DictionaryEntity[];
}
