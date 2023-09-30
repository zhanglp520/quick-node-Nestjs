import { VersioningType } from "@nestjs/common";
import { HttpAdapterHost, NestFactory } from "@nestjs/core";
import { NestExpressApplication } from "@nestjs/platform-express";
import { join } from "path";
import { AppModule } from "@/app.module";
import { ValidationPipe } from "@/common/pipes/validation.pipe";
import { TransformInterceptor } from "@/common/interceptors/transform.interceptor";
import { LoggerInterceptor } from "@/common/interceptors/logger.interceptor";
import { AllExceptionsFilter } from "@/common/filters/all-exceptions.filter";
import { LogService } from "@/modules/system/log/log.service";
// import { LoggerMiddleware } from '@/common/middleware/logger.middleware';
import { DocumentBuilder, SwaggerModule } from "@nestjs/swagger";
import { knife4jSetup } from "nestjs-knife4j";

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
    prefix: "api/v",
    defaultVersion: "2",
  });

  app.useStaticAssets(join(__dirname, "..", "public"), {
    prefix: "/public/",
  });
  console.log("静态路径", join(__dirname, "..", "public"));

  const config = new DocumentBuilder()
    .setTitle("quick-order接口文档")
    .setDescription("quick-vue3-order接口文档方便开发者使用")
    .setVersion("2.0.0.RELEASE")
    .setContact("土豆哥", "https://order.ainiteam.com", "zz15229380174@163.com")
    .addServer("http://localhost:6101", "开发环境")
    .addServer("https://api.order.ainiteam.com/", "生产环境")
    .setTermsOfService("https://order.ainiteam.com")
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup("api", app, document);

  knife4jSetup(app, {
    urls: [
      {
        name: "默认",
        url: `/api-json`,
        swaggerVersion: "2.0",
        location: `/api-json`,
      },
    ],
  });

  await app.listen(6101);
  console.log(`Application is running on: ${await app.getUrl()}`);
}

bootstrap();
