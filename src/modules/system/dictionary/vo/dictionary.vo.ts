import { ApiProperty } from "@nestjs/swagger";
import { AutoMap } from "@automapper/classes";
import { BaseVo } from "src/vos/base.dto";

export class DictionaryVo extends BaseVo {
  @ApiProperty({ description: "字典编号" })
  @AutoMap()
  dicId: string;

  @ApiProperty({ description: "字典名称" })
  @AutoMap()
  dicName: string;

  @ApiProperty({ description: "字典分类编号" })
  @AutoMap()
  dicTypeId: string;
}
