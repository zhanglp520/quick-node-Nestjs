import { ApiProperty } from "@nestjs/swagger";
import { AutoMap } from "@automapper/classes";
import { BaseVo } from "src/vos/base.dto";

export class ProductVo extends BaseVo {
  @ApiProperty({ description: "产品编号" })
  @AutoMap()
  productId: string;

  @ApiProperty({ description: "产品名称" })
  @AutoMap()
  productName: string;

  @ApiProperty({ description: "产品分类" })
  @AutoMap()
  productType: number;

  @ApiProperty({ description: "设备分类" })
  @AutoMap()
  deviceType: number;

  @ApiProperty({ description: "启用" })
  @AutoMap()
  enabled: boolean;

  @ApiProperty({ description: "创建时间" })
  @AutoMap()
  createTime: Date;

  @ApiProperty({ description: "备注" })
  @AutoMap()
  remark: string;
}
