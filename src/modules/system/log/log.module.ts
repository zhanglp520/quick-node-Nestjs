import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { LogController } from "./log.controller";
import { LogEntity } from "./entities/log.entity";
import { logOpts } from "../../../config/orm.config";
import { LogService } from "./log.service";
import { LogMapperProfile } from "./mapper/log.mapper";

@Module({
  imports: [
    TypeOrmModule.forRoot(logOpts),
    TypeOrmModule.forFeature([LogEntity], "iot_log_dev"), //指定日志数据库连接名称来切换数据库
  ],
  controllers: [LogController],
  providers: [LogService, LogMapperProfile],
  exports: [LogService],
})
export class LogModule {}
