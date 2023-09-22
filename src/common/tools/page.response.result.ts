import { ApiProperty } from "@nestjs/swagger";

export class PageResponseResult<T> {
  @ApiProperty({ description: "总条数" })
  total: number;

  @ApiProperty({ description: "承载数据" })
  payload?: T;

  constructor(total: number, payload: T) {
    this.total = total;
    this.payload = payload;
  }
}
