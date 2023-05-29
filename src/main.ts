import { VersioningType } from '@nestjs/common';
import { HttpAdapterHost, NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from './common/pipes/validation.pipe';
import { TransformInterceptor } from './common/interceptors/transform.interceptor';
import { LoggerInterceptor } from './common/interceptors/Logger.interceptor';
import { AllExceptionsFilter } from './common/filters/all-exceptions.filter';
import { LogService } from './modules/system/log/log.service';
import { NestExpressApplication } from '@nestjs/platform-express';
import { join } from 'path';
// import { LoggerMiddleware } from './common/middleware/logger.middleware';

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);
  const AppHttpAdapter = app.get(HttpAdapterHost);

  app.useGlobalPipes(new ValidationPipe());
  app.useGlobalInterceptors(
    ...[
      new TransformInterceptor(),
      // new LoggerInterceptor(app.get('LOG_PROVIDER')),
      new LoggerInterceptor(app.get(LogService)),
    ]
  );
  app.useGlobalFilters(
    // new AllExceptionsFilter(AppHttpAdapter, app.get('LOG_PROVIDER'))
    new AllExceptionsFilter(AppHttpAdapter, app.get(LogService))
  );
  // app.use(new LoggerMiddleware().use);//TODO:暂有bug
  app.enableVersioning({
    type: VersioningType.URI,
    prefix: 'api/v',
    defaultVersion: '2',
  });
  app.useStaticAssets(join(__dirname, '..', 'public'), {
    prefix: '/public/'
  });
const port=3103
  await app.listen(port);
  console.log(`Application is running on: http://localhost:${port}`);
}

bootstrap();
