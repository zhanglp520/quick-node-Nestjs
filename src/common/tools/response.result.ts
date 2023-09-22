import { ApiProperty } from "@nestjs/swagger";
import { ResponseStatus } from "@/common/enums/response-status.enum";

export class ResponseResult<T = any> {
  @ApiProperty({
    name: "status",
    type: "number",
    enumName: "状态",
    enum: ResponseStatus,
    description: "状态",
  })
  status: ResponseStatus;

  @ApiProperty({ description: "消息", type: "string" })
  msg: string;

  @ApiProperty({ description: "数据", type: "object" })
  data?: T;

  constructor(status: number, msg: string, data?: T) {
    this.status = status;
    this.msg = msg;
    this.data = data;
  }
}
