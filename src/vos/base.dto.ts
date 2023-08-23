import { AutoMap } from '@automapper/classes';
import { ApiPropertyOptional } from '@nestjs/swagger';

export class BaseVo {
  @ApiPropertyOptional({ description: '主键' })
  @AutoMap()
  id?: number;
}
