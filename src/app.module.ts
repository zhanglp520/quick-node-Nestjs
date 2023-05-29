import { Dependencies, Module } from '@nestjs/common';
import { APP_GUARD } from '@nestjs/core';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { defaultOpts } from './config/orm.config';
import { DataSource } from 'typeorm';
import { JwtAuthGuard } from './modules/auth/guards/jwt-auth.guard';
import { UploadModule } from './modules/upload/upload.module';
import { AuthModule } from './modules/auth/auth.module';
import { UserModule } from './modules/system/user/user.module';
import { MenuModule } from './modules/system/menu/menu.module';
import { RoleModule } from './modules/system/role/role.module';
import { DeptModule } from './modules/system/dept/dept.module';
import { LogModule } from './modules/system/log/log.module';
import { DictionaryTypeModule } from './modules/system/dictionaryType/dictionary-type.module';
import { DictionaryModule } from './modules/system/dictionary/dictionary.module';

@Dependencies(DataSource)
@Module({
  imports: [
    UploadModule,
    AuthModule,
    RoleModule,
    UserModule,
    MenuModule,
    DeptModule,
    LogModule,
    DictionaryTypeModule,
    DictionaryModule,
    TypeOrmModule.forRoot(defaultOpts),
  ],
  controllers: [AppController],
  providers: [
    AppService,
    {
      provide: APP_GUARD,
      useClass: JwtAuthGuard,
    },
  ],
})
export class AppModule { }
