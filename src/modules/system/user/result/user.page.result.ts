import { ApiProperty } from "@nestjs/swagger";
import { UserEntity } from "../entities/user.entity";

export class UserPageResult {
  @ApiProperty({ description: "承载数据", type: () => [UserEntity] })
  payload: UserEntity[];

  @ApiProperty({ description: "总条数" })
  total: number;
}
