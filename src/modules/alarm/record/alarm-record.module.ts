import { Module } from "@nestjs/common";
import { AlarmRecordService } from "./alarm-record.service";
import { AlarmRecordController } from "./alarm-record.controller";
import { TypeOrmModule } from "@nestjs/typeorm";
import { AlarmRecordEntity } from "./entities/alarm-record.entity";

@Module({
  imports: [TypeOrmModule.forFeature([AlarmRecordEntity])],
  controllers: [AlarmRecordController],
  providers: [AlarmRecordService],
  exports: [AlarmRecordService],
})
export class AlarmRecordModule {}
