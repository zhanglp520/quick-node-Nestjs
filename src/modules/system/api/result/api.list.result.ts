import { ApiProperty } from "@nestjs/swagger";
import { ApiEntity } from "../entities/api.entity";

export class ApiListResult {
  @ApiProperty({
    name: "status",
    type: Number,
    description: "状态:0-成功,1-失败,2-异常",
  })
  status: number;

  @ApiProperty({ description: "消息" })
  msg: string;

  @ApiProperty({ description: "数据", type: () => [ApiEntity] })
  data: ApiEntity[];
}
