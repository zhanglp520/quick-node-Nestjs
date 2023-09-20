import { ApiProperty } from "@nestjs/swagger";
import { DeviceEntity } from "../entities/device.entity";

export class DeviceResult {
  @ApiProperty({ description: "数据", type: () => DeviceEntity })
  data: DeviceEntity;
}
