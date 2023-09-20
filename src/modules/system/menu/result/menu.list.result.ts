import { ApiProperty } from "@nestjs/swagger";
import { MenuEntity } from "../entities/menu.entity";
import { Result } from "@/common/tools/result";

export class MenuListResult extends Result {
  @ApiProperty({ description: "数据", type: () => [MenuEntity] })
  data: MenuEntity[];
}
