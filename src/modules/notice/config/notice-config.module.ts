import { Module } from '@nestjs/common';
import { NoticeConfigService } from './notice-config.service';
import { NoticeConfigController } from './notice-config.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { NoticeConfigEntity } from './entities/notice-config.entity';

@Module({
  imports: [TypeOrmModule.forFeature([NoticeConfigEntity])],
  controllers: [NoticeConfigController],
  providers: [NoticeConfigService],
  exports: [NoticeConfigService],
})
export class NoticeConfigModule {}
