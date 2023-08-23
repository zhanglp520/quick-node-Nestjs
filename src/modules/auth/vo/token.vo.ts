import { AutoMap } from '@automapper/classes';
import { ApiProperty } from '@nestjs/swagger';

export class TokenVo {
  @ApiProperty({ description: '令牌' })
  @AutoMap()
  quickAccessToken: String;

  @ApiProperty({ description: '刷新令牌' })
  @AutoMap()
  quickRefreshToken: String;

  @ApiProperty({ description: '过期时间' })
  @AutoMap()
  expiresIn: String;
}
