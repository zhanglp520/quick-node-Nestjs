import { Injectable, NestMiddleware } from "@nestjs/common";
import { Request, Response, NextFunction } from "express";
import * as Log4js from "log4js";
import log4jsConfig from "@/config/log4.config";

@Injectable()
export class LoggerMiddleware implements NestMiddleware {
  constructor() {
    Log4js.configure(log4jsConfig);
  }
  use(req: Request, res: Response, next: NextFunction) {
    next();
    console.log("res", res);
    const status = res.statusCode;
    const msg = status === 200 ? "操作成功." : "操作失败.";
    const data = status === 200 ? JSON.stringify(res) : null; //res bug
    const logData = {
      request: JSON.stringify({
        url: req.url,
        method: req.method,
        query: req.query,
        params: req.params,
        body: req.body,
      }),
      response: JSON.stringify({
        status,
        msg,
        data,
      }),
      ip: req.headers?.remoteip
        ? String(req.headers.remoteip)
        : req.ip.split(":").pop(),
    };
    if (status === 200) {
      const logger = Log4js.getLogger("info");
      logger.info(logData);
    } else {
      const logger = Log4js.getLogger("error");
      logger.error({
        ...logData,
        // execution: exception.response ? exception.response : exception,
      });
    }
  }
}
