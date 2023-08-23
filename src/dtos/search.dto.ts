import { ApiPropertyOptional } from '@nestjs/swagger';
import { PageDto } from '@/dtos/page.dto';

export class SearchDto {
  @ApiPropertyOptional({ description: '关键字' })
  keyword: string;
  @ApiPropertyOptional({ description: '开始时间' })
  startTime: Date;
  @ApiPropertyOptional({ description: '结束时间' })
  endTime: Date;
  @ApiPropertyOptional({ description: '分页对象' })
  page: PageDto;
}
