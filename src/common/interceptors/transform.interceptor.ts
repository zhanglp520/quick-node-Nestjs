import {
  Injectable,
  NestInterceptor,
  CallHandler,
  ExecutionContext,
} from "@nestjs/common";
import { map } from "rxjs/operators";
import { Observable } from "rxjs";
import { ResponseResult } from "@/common/tools/response.result";

@Injectable()
export class TransformInterceptor<T>
  implements NestInterceptor<T, ResponseResult<T>>
{
  intercept(
    context: ExecutionContext,
    next: CallHandler<T>
  ): Observable<ResponseResult<T>> {
    return next.handle().pipe(
      map((data) => {
        return new ResponseResult(0, "操作成功", data ?? null);
      })
    );
  }
}
