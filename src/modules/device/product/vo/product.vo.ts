import { ApiProperty, ApiPropertyOptional } from "@nestjs/swagger";
import { AutoMap } from "@automapper/classes";
import { BaseVo } from "src/vos/base.dto";
import { Transform } from "class-transformer";
import { DeviceVo } from "../../device/vo/device.vo";
// eslint-disable-next-line @typescript-eslint/no-var-requires
const moment = require("moment");

//extends BaseVo
export class ProductVo {
  @ApiPropertyOptional({ description: "主键" })
  @AutoMap()
  id: number;

  @ApiProperty({ description: "产品编号" })
  @AutoMap()
  productId: string;

  @ApiProperty({ description: "产品名称" })
  @AutoMap()
  productName: string;

  @ApiProperty({ description: "品类方式" })
  @AutoMap()
  categoryMode: number;

  @ApiProperty({ description: "产品分类" })
  @AutoMap()
  productType: number;

  @ApiProperty({ description: "设备类型" })
  @AutoMap()
  deviceType: number;

  @ApiProperty({ description: "接入协议" })
  @AutoMap()
  accessProtocol: number;

  @ApiProperty({ description: "数据协议" })
  @AutoMap()
  dataProtocol: number;

  @ApiProperty({ description: "联网方式" })
  @AutoMap()
  networkMode: number;

  @ApiProperty({ description: "公钥" })
  @AutoMap()
  accessKey: string;

  @ApiProperty({ description: "产品秘钥" })
  @AutoMap()
  productKey: string;

  @ApiProperty({ description: "产品私密" })
  @AutoMap()
  productSecret: string;

  @ApiProperty({ description: "启用" })
  @AutoMap()
  enabled: boolean;

  @ApiProperty({ description: "发布" })
  @AutoMap()
  published: boolean;

  @ApiProperty({ description: "创建时间" })
  @AutoMap()
  @Transform((createTime: any) =>
    moment(createTime.value).format("YYYY-MM-DD HH:mm:ss")
  )
  createTime: Date;

  @ApiProperty({ description: "修改时间" })
  @AutoMap()
  @Transform((updateTime: any) =>
    moment(updateTime.value).format("YYYY-MM-DD HH:mm:ss")
  )
  updateTime: Date;

  @ApiProperty({ description: "发布时间" })
  @AutoMap()
  @Transform((publishTime: any) =>
    moment(publishTime.value).format("YYYY-MM-DD HH:mm:ss")
  )
  publishTime: Date;

  @ApiProperty({ description: "撤销发布时间" })
  @AutoMap()
  @Transform((unpublishTime: any) =>
    moment(unpublishTime.value).format("YYYY-MM-DD HH:mm:ss")
  )
  unpublishTime: Date;

  @ApiProperty({ description: "备注" })
  @AutoMap()
  remark: string;

  @ApiProperty({ description: "设备列表" })
  @AutoMap()
  devices: any;
}
