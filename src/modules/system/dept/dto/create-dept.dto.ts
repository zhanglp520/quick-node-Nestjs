import { ApiExtraModels, ApiProperty } from "@nestjs/swagger";

// @ApiExtraModels(CreateDeptDto)
export class CreateDeptDto {
  @ApiProperty({ description: "部门编号" })
  deptId: string;

  @ApiProperty({ description: "部门名称" })
  deptName: string;

  @ApiProperty({ description: "父级编号" })
  pId: string;
}
