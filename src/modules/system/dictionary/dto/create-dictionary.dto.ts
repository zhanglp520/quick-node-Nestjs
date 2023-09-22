import { ApiProperty } from "@nestjs/swagger";

export class CreateDictionaryDto {
  @ApiProperty({ description: "字典编号" })
  dicId: string;

  @ApiProperty({ description: "字典名称" })
  dicName: string;

  @ApiProperty({ description: "备注" })
  remark: string;
}
