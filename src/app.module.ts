import { Dependencies, Module } from '@nestjs/common';
import { APP_GUARD } from '@nestjs/core';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DataSource } from 'typeorm';
import { AutomapperModule } from '@automapper/nestjs';
import { classes } from '@automapper/classes';
import { AppController } from '@/app.controller';
import { AppService } from '@/app.service';
import { defaultOpts } from '@/config/orm.config';
import { JwtAuthGuard } from '@/modules/auth/guards/jwt-auth.guard';
import { DownloadModule } from '@/modules/download/download.module';
import { UploadModule } from '@/modules/upload/upload.module';
import { AuthModule } from '@/modules/auth/auth.module';
import { UserModule } from '@/modules/system/user/user.module';
import { MenuModule } from '@/modules/system/menu/menu.module';
import { RoleModule } from '@/modules/system/role/role.module';
import { DeptModule } from '@/modules/system/dept/dept.module';
import { LogModule } from '@/modules/system/log/log.module';
import { DictionaryTypeModule } from '@/modules/system/dictionaryType/dictionary-type.module';
import { DictionaryModule } from '@/modules/system/dictionary/dictionary.module';
import { ApiModule } from '@/modules/system/api/api.module';
import { RolesGuard } from '@/modules/auth/guards/roles.guard';

@Dependencies(DataSource)
@Module({
  imports: [
    DownloadModule,
    UploadModule,
    AuthModule,
    RoleModule,
    UserModule,
    MenuModule,
    DeptModule,
    LogModule,
    DictionaryTypeModule,
    DictionaryModule,
    ApiModule,
    TypeOrmModule.forRoot(defaultOpts),
    AutomapperModule.forRoot(
      {
        strategyInitializer: classes(),
      }
      // {
      //   // globalErrorHandler:ErrorHandler
      //   // globalNamingConventions: {},
      // }
    ),
  ],
  controllers: [AppController],
  providers: [
    AppService,
    {
      provide: APP_GUARD,
      useClass: JwtAuthGuard,
    },
    {
      provide: APP_GUARD,
      useClass: RolesGuard,
    },
  ],
})
export class AppModule {}
