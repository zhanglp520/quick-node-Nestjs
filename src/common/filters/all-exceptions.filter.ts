import {
  ExceptionFilter,
  Catch,
  ArgumentsHost,
  HttpException,
  HttpStatus,
} from "@nestjs/common";
import { HttpAdapterHost } from "@nestjs/core";
import * as Log4js from "log4js";
import { LogService } from "@/modules/system/log/log.service";
import log4jsConfig from "@//config/log4.config";
import { CreateLogDto } from "@/modules/system/log/dto/create-log.dto";

@Catch()
export class AllExceptionsFilter implements ExceptionFilter {
  constructor(
    private readonly httpAdapterHost: HttpAdapterHost,
    private readonly logService: LogService
  ) {
    Log4js.configure(log4jsConfig);
  }

  catch(exception: any, host: ArgumentsHost): void {
    const { httpAdapter } = this.httpAdapterHost;
    const http = host.switchToHttp();
    const req = http.getRequest();
    const res = http.getResponse();
    const httpStatus: number =
      exception instanceof HttpException
        ? exception.getStatus()
        : HttpStatus.INTERNAL_SERVER_ERROR;
    // const msg: string = exception.response
    //   ? exception.response.message
    //     ? exception.response.message
    //     : exception.response.errorMsg
    //   : "服务器内部错误,请联系管理员.";
    const msg: string = exception.response
      ? exception.response
      : "服务器内部错误,请联系管理员.";
    const responseBody: any = {
      status: 1,
      error: httpStatus,
      msg: msg,
    };
    httpAdapter.reply(res, responseBody, httpStatus);
    const start = Date.now();
    const end = Date.now();
    const logObj = {
      type: 1,
      request: JSON.stringify({
        url: req.url,
        method: req.method,
        query: req.query,
        params: req.params,
        body: req.body,
      }),
      response: JSON.stringify(responseBody),
      execution: exception,
      duration: end - start,
      operateId: "admin",
      ip: req.headers?.remoteip
        ? String(req.headers.remoteip)
        : req.ip.split(":").pop(),
    };
    const logger = Log4js.getLogger("error");
    logger.error(logObj);
    if (!req.url.includes("/system/logs")) {
      const createLogDto = new CreateLogDto();
      createLogDto.type = logObj.type;
      createLogDto.ip = logObj.ip;
      createLogDto.request = logObj.request;
      createLogDto.response = logObj.response;
      createLogDto.duration = logObj.duration;
      createLogDto.operateId = logObj.operateId;
      this.logService.createLog(createLogDto);
    }
  }
}
