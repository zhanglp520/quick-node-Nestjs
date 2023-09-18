import { ApiProperty } from "@nestjs/swagger";
import { UserEntity } from "../entities/user.entity";

export class UserPageResult {
  @ApiProperty({
    name: "status",
    type: Number,
    description: "状态:0-成功,1-失败,2-异常",
  })
  status: number;

  @ApiProperty({ description: "消息" })
  msg: string;

  @ApiProperty({ description: "承载数据", type: () => [UserEntity] })
  payload: UserEntity[];

  @ApiProperty({ description: "总条数" })
  total: number;
}
