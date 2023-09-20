import { ApiProperty } from "@nestjs/swagger";
import { RoleEntity } from "../entities/role.entity";

export class RolePageResult {
  @ApiProperty({ description: "承载数据", type: () => [RoleEntity] })
  payload: RoleEntity[];

  @ApiProperty({ description: "总条数" })
  total: number;
}
