export class CreateProductDto {
  productId: string;
  productName: string;
  categoryMode: number;
  productType: number;
  deviceType: number;
  accessProtocol: number;
  dataProtocol: number;
  networkMode: number;
  accessKey: number;
  productKey: number;
  productSecret: number;
  enabled: boolean;
  published: boolean;
  createTime: Date;
  updateTime: Date;
  publishTime: Date;
  unpublishTime: Date;
  remark: string;
}
