import { ApiPropertyOptional } from '@nestjs/swagger';

export class PageDto {
  @ApiPropertyOptional({ description: '当前页码' })
  current = 1;
  @ApiPropertyOptional({ description: '每页条数' })
  size = 10;
  @ApiPropertyOptional({ description: '总条数' })
  total? = 0;
}
