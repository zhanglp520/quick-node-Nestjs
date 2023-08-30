import { ApiProperty } from "@nestjs/swagger";
import { AutoMap } from "@automapper/classes";
import { BaseVo } from "src/vos/base.dto";

export class LogVo extends BaseVo {
  @ApiProperty({ description: "类型" })
  @AutoMap()
  type: string;

  @ApiProperty({ description: "ip地址" })
  @AutoMap()
  ip: string;

  @ApiProperty({ description: "请求" })
  @AutoMap()
  request: string;

  @ApiProperty({ description: "响应" })
  @AutoMap()
  response: string;

  @ApiProperty({ description: "异常" })
  @AutoMap()
  exception: string;

  @ApiProperty({ description: "时长" })
  @AutoMap()
  duration: number;

  @ApiProperty({ description: "操作人编号" })
  @AutoMap()
  operateId: string;

  @ApiProperty({ description: "创建时间" })
  @AutoMap()
  createTime: Date;
}
