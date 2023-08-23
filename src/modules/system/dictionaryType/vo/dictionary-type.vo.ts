import { ApiProperty } from '@nestjs/swagger';
import { AutoMap } from '@automapper/classes';
import { BaseVo } from 'src/vos/base.dto';

export class DictionaryTypeVo extends BaseVo {
  @ApiProperty({ description: '字典分类编号' })
  @AutoMap()
  dicTypeId: string;

  @ApiProperty({ description: '字典分类名称' })
  @AutoMap()
  dicTypeName: string;
}
