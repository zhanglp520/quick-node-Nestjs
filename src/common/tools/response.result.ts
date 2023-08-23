import { ApiProperty } from "@nestjs/swagger";
import { ResponseStatus } from "@/common/enums/response-status.enum";

export class ResponseResult<T> {
  @ApiProperty({
    name: "status",
    type: "number",
    // enumName: 'tst',//无效
    enum: ResponseStatus,
    description: "状态",
  })
  status: ResponseStatus;

  @ApiProperty({ description: "消息" })
  msg: string;

  @ApiProperty({ description: "数据" })
  data: T;
}
