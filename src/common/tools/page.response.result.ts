import { ApiProperty } from '@nestjs/swagger';

export class PageResponseResult<T> {
  @ApiProperty({ description: '承载数据' })
  payload: T;

  @ApiProperty({ description: '总条数' })
  total: number;
}
