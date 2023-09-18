import { ApiProperty } from "@nestjs/swagger";
import { ResponseStatus } from "../enums/response-status.enum";

export class PageResponseResult<T> {
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

  @ApiProperty({ description: "总条数" })
  total: number;

  @ApiProperty({ description: "承载数据" })
  payload?: T;

  constructor(status: number, msg: string, total: number, payload: T) {
    this.status = status;
    this.msg = msg;
    this.total = total;
    this.payload = payload;
  }
}
