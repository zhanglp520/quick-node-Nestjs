import { Module } from "@nestjs/common";
import { RuleConfigService } from "./rule-config.service";
import { RuleConfigController } from "./rule-config.controller";
import { TypeOrmModule } from "@nestjs/typeorm";
import { RuleConfigEntity } from "./entities/rule-config.entity";

@Module({
  imports: [TypeOrmModule.forFeature([RuleConfigEntity])],
  controllers: [RuleConfigController],
  providers: [RuleConfigService],
  exports: [RuleConfigService],
})
export class RuleConfigModule {}
