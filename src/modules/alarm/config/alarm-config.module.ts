import { Module } from "@nestjs/common";
import { AlarmConfigService } from "./alarm-config.service";
import { AlarmConfigController } from "./alarm-config.controller";
import { TypeOrmModule } from "@nestjs/typeorm";
import { AlarmConfigEntity } from "./entities/alarm-config.entity";

@Module({
  imports: [TypeOrmModule.forFeature([AlarmConfigEntity])],
  controllers: [AlarmConfigController],
  providers: [AlarmConfigService],
  exports: [AlarmConfigService],
})
export class AlarmConfigModule {}
