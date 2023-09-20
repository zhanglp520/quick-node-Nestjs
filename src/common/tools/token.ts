import { ApiProperty } from "@nestjs/swagger";

export class Token {
  @ApiProperty({ description: "令牌", type: "string" })
  quickAccessToken: string;

  @ApiProperty({ description: "刷新令牌", type: "string" })
  quickRefreshToken: string;

  @ApiProperty({ description: "过期时间", type: "string" })
  expiresIn: string;
}
