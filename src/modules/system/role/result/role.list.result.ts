import { ApiProperty } from "@nestjs/swagger";
import { RoleEntity } from "../entities/role.entity";
import { Result } from "@/common/tools/result";

export class RoleListResult extends Result {
  @ApiProperty({ description: "数据", type: () => [RoleEntity] })
  data: RoleEntity[];
}
