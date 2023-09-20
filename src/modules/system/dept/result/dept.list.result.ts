import { ApiProperty } from "@nestjs/swagger";
import { DeptEntity } from "../entities/dept.entity";
import { Result } from "@/common/tools/result";

export class DeptListResult extends Result {
  @ApiProperty({ description: "数据", type: () => [DeptEntity] })
  data: DeptEntity[];
}
