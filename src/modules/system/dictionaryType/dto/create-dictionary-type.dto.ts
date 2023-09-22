import { ApiProperty } from "@nestjs/swagger";

export class CreateDictionaryTypeDto {
  @ApiProperty({ description: "字典分类编号" })
  dicTypeId: string;

  @ApiProperty({ description: "字典分类名称" })
  dicTypeName: string;

  @ApiProperty({ description: "备注" })
  remark: string;
}
