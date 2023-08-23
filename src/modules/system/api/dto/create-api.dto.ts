import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, IsPhoneNumber } from 'class-validator';

export class CreateApiDto {
  @ApiProperty({ description: '接口编号' })
  @IsNotEmpty({ message: '参数错误,接口编号不能为空.' })
  apiId: string;

  @ApiProperty({ description: '接口名称' })
  @IsNotEmpty({ message: '参数错误,接口名不能为空.' })
  apiName: string;

  @ApiProperty({ description: '接口地址' })
  @IsNotEmpty({ message: '参数错误,接口地址不能为空.' })
  apiPath: string;

  @ApiPropertyOptional({ description: '备注' })
  remark: string;
}
