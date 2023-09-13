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
import {
  DocumentBuilder,
  SwaggerModule,
  SwaggerDocumentOptions,
  SwaggerCustomOptions,
} from "@nestjs/swagger";
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
    .setTitle("quick-vue3-admin接口文档")
    .setDescription("quick-vue3-admin接口文档方便开发者使用")
    .setVersion("2.0.0.RELEASE")
    .setContact("土豆哥", "https://quick.ainiteam.com", "zz15229380174@163.com")
    // .addServer('http://127.0.0.1:4100', '开发服务器地址')
    .addServer("http://localhost:4100", "开发环境")
    .addServer("https://api.quick.ainiteam.com/", "生产环境")
    // .setBasePath('http://127.0.0.1:4100')
    .setTermsOfService("https://quick.ainiteam.com")
    .build();

  const options: SwaggerDocumentOptions = {
    operationIdFactory: (controllerKey: string, methodKey: string) => methodKey,
  };

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup("api", app, document, {
    useGlobalPrefix: true,
  }); //localhost:2000/doc
  knife4jSetup(app, {
    urls: [
      {
        name: "首页",
        url: `/api-json`,
        swaggerVersion: "2.0",
        location: `/api-json`,
      },
      {
        name: "系统模块",
        url: `/api-json`,
        swaggerVersion: "2.0",
        location: `/api/v2/system?group=系统模块`,
      },
      // {
      //   name: '测试',
      //   url: `/api-json`,
      //   swaggerVersion: '2.0',
      //   location: `/api-json`,
      // },
      // {
      //   name: '系统模块',
      //   url: `127.0.0.1`,
      //   swaggerVersion: '2.0',
      //   location: `/api/v2?group=系统模块`,
      // },
      // {
      //   name: '权限模块',
      //   url: `/api-json`,
      //   swaggerVersion: '2.0',
      //   location: `/api-json`,
      // },
      // {
      //   name: '开发者模块',
      //   url: `/api-json`,
      //   swaggerVersion: '2.0',
      //   location: `/api-json`,
      // },
    ],
  });

  await app.listen(3101);
  console.log(`Application is running on: ${await app.getUrl()}`);
}

bootstrap();
