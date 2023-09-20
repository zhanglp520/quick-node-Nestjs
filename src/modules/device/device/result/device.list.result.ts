import { ApiProperty } from "@nestjs/swagger";
import { DeviceEntity } from "../entities/device.entity";
import { Result } from "@/common/tools/result";

export class DeviceListResult extends Result {
  @ApiProperty({ description: "数据", type: () => [DeviceEntity] })
  data: DeviceEntity[];
}
