import { ApiProperty } from "@nestjs/swagger";
import { UserEntity } from "../entities/user.entity";
import { Result } from "@/common/tools/result";

export class UserListResult extends Result {
  @ApiProperty({ description: "数据", type: () => [UserEntity] })
  data: UserEntity[];
}
