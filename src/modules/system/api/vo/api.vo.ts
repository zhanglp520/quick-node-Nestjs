import { AutoMap } from '@automapper/classes';
import { ApiProperty } from '@nestjs/swagger';
import { Transform } from 'class-transformer';
import { BaseVo } from 'src/vos/base.dto';
const moment = require('moment');

export class ApiVo extends BaseVo {
  @ApiProperty({ description: '接口编号' })
  @AutoMap()
  apiId: string;

  @ApiProperty({ description: '接口名' })
  @AutoMap()
  apiName: string;

  @ApiProperty({ description: '接口地址' })
  @AutoMap()
  apiPath: string;

  @ApiProperty({ description: '创建时间' })
  @AutoMap()
  @Transform((createTime: any) =>
    moment(createTime.value).format('YYYY-MM-DD HH:mm:ss')
  )
  createTime: Date;

  @ApiProperty({ description: '备注' })
  @AutoMap()
  remark: string;
}
