export class CreateLogDto {
  type: number; //日志类型：0：操作；1：异常
  ip: string;
  request: string;
  response: string;
  execution: string;
  duration: number;
  operateId: string;
  createTime: Date;
}
