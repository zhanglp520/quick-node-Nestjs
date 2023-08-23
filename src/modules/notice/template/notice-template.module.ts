import { Module } from "@nestjs/common";
import { NoticeTemplateService } from "./notice-template.service";
import { NoticeTemplateController } from "./notice-template.controller";
import { TypeOrmModule } from "@nestjs/typeorm";
import { NoticeTemplateEntity } from "./entities/notice-template.entity";

@Module({
  imports: [TypeOrmModule.forFeature([NoticeTemplateEntity])],
  controllers: [NoticeTemplateController],
  providers: [NoticeTemplateService],
  exports: [NoticeTemplateService],
})
export class NoticeTemplateModule {}
