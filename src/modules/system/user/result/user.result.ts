import { ApiProperty } from "@nestjs/swagger";
import { UserEntity } from "../entities/user.entity";

export class UserResult {
  @ApiProperty({ description: "数据", type: () => UserEntity })
  data: UserEntity;
}
