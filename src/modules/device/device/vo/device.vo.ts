import { ApiProperty, ApiPropertyOptional } from "@nestjs/swagger";
import { AutoMap } from "@automapper/classes";
import { BaseVo } from "src/vos/base.dto";
import { Transform } from "class-transformer";
import { ProductVo } from "../../product/vo/product.vo";

// extends BaseVo
export class DeviceVo {
  @ApiPropertyOptional({ description: "主键" })
  @AutoMap()
  id: number;

  @ApiProperty({ description: "设备编号" })
  @AutoMap()
  deviceId: string;

  @ApiProperty({ description: "设备名称" })
  @AutoMap()
  deviceName: string;

  @ApiProperty({ description: "产品编号" })
  @AutoMap()
  productId: string;

  @ApiProperty({ description: "启用" })
  @AutoMap()
  enabled: boolean;

  @ApiProperty({ description: "状态" })
  @AutoMap()
  status: boolean;

  @ApiProperty({ description: "创建时间" })
  @AutoMap()
  createTime: Date;

  @ApiProperty({ description: "备注" })
  @AutoMap()
  remark: string;

  @ApiProperty({ description: "所属产品" })
  @AutoMap()
  product: any;
}
