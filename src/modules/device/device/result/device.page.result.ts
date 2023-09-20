import { ApiProperty } from "@nestjs/swagger";
import { DeviceEntity } from "../entities/device.entity";

export class DevicePageResult {
  @ApiProperty({ description: "承载数据", type: () => [DeviceEntity] })
  payload: DeviceEntity[];

  @ApiProperty({ description: "总条数" })
  total: number;
}
