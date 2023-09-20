import { ApiProperty } from "@nestjs/swagger";

export class CreateProductDto {
  @ApiProperty({ description: "产品编号" })
  productId: string;

  @ApiProperty({ description: "产品名称" })
  productName: string;

  @ApiProperty({ description: "品类方式" })
  categoryMode: number;

  @ApiProperty({ description: "产品分类" })
  productType: number;

  @ApiProperty({ description: "设备类型" })
  deviceType: number;

  @ApiProperty({ description: "接入协议" })
  accessProtocol: number;

  @ApiProperty({ description: "数据协议" })
  dataProtocol: number;

  @ApiProperty({ description: "联网方式" })
  networkMode: number;

  @ApiProperty({ description: "公钥" })
  accessKey: number;

  @ApiProperty({ description: "产品秘钥" })
  productKey: number;

  @ApiProperty({ description: "产品私密" })
  productSecret: number;

  @ApiProperty({ description: "启用" })
  enabled: boolean;

  @ApiProperty({ description: "发布" })
  published: boolean;

  @ApiProperty({ description: "创建时间" })
  createTime: Date;

  @ApiProperty({ description: "修改时间" })
  updateTime: Date;

  @ApiProperty({ description: "发布时间" })
  publishTime: Date;

  @ApiProperty({ description: "撤销发布时间" })
  unpublishTime: Date;

  @ApiProperty({ description: "备注" })
  remark: string;
}
