import {
  Injectable,
  NestInterceptor,
  CallHandler,
  ExecutionContext,
} from '@nestjs/common';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';
import * as Log4js from 'log4js';
import config from '../../config/log4.config';
import { LogService } from '../../modules/system/log/log.service';
import { CreateLogDto } from '../../modules/system/log/dto/create-log.dto';

@Injectable()
export class LoggerInterceptor implements NestInterceptor {
  constructor(private readonly logService: LogService) {
    Log4js.configure(config);
  }
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    const start = Date.now();
    const req = context.getArgByIndex(1).req;
    const logData = {
      type: 0,
      ip: req.headers?.remoteip
        ? String(req.headers.remoteip)
        : req.ip.split(':').pop(),
      operateId: 'admin',
      request: JSON.stringify({
        url: req.url,
        method: req.method,
        query: req.query,
        params: req.params,
        body: req.body,
      }),
    };

    return next.handle().pipe(
      map((data) => {
        const end = Date.now();
        const logObj = {
          ...logData,
          response: JSON.stringify({
            status: 0,
            msg: '操作成功.',
            data: data ? data : null,
          }),
          duration: end - start,
          operateId: 'admin',
        };

        const logger = Log4js.getLogger('info');
        logger.info(logObj);
        if (!req.url.includes('/system/logs')) {
          const createLogDto = new CreateLogDto();
          createLogDto.type = 0;
          createLogDto.ip = logObj.ip;
          createLogDto.request = logObj.request;
          createLogDto.response = logObj.response;
          createLogDto.duration = logObj.duration;
          createLogDto.operateId = logObj.operateId;
          this.logService.createLog(createLogDto);
        }
        return data;
      })
    );
  }
}
