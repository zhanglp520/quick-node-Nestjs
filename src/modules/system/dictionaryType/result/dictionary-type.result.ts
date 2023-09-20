import { ApiProperty } from "@nestjs/swagger";
import { DictionaryTypeEntity } from "../entities/dictionary-type.entity";
import { Result } from "@/common/tools/result";

export class DictionaryTypeResult extends Result {
  @ApiProperty({ description: "数据", type: () => DictionaryTypeEntity })
  data: DictionaryTypeEntity;
}
