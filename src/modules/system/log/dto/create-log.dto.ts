import { LogType } from "@/common/enums/log.enum";
import { ApiProperty } from "@nestjs/swagger";

export class CreateLogDto {
  @ApiProperty({ description: "日志类型" })
  type: LogType;

  @ApiProperty({ description: "ip地址" })
  ip: string;

  @ApiProperty({ description: "请求" })
  request: string;

  @ApiProperty({ description: "响应" })
  response: string;

  @ApiProperty({ description: "异常" })
  execution: string;

  @ApiProperty({ description: "时长" })
  duration: number;

  @ApiProperty({ description: "操作人" })
  operateId: string;

  @ApiProperty({ description: "备注" })
  remark: string;
}
