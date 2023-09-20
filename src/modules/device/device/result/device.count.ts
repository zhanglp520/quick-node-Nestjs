import { ApiProperty } from "@nestjs/swagger";

export class DeviceCount {
  @ApiProperty({ description: "总数", type: "number" })
  count: number;

  @ApiProperty({ description: "在线数", type: "number" })
  onlineCount: number;

  @ApiProperty({ description: "离线数", type: "number" })
  offlineCount: number;
}
