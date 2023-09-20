import { Module } from "@nestjs/common";
import { DictionaryTypeService } from "./dictionary-type.service";
import { DictionaryTypeController } from "./dictionary-type.controller";
import { TypeOrmModule } from "@nestjs/typeorm";
import { DictionaryTypeEntity } from "./entities/dictionary-type.entity";

@Module({
  imports: [TypeOrmModule.forFeature([DictionaryTypeEntity])],
  controllers: [DictionaryTypeController],
  providers: [DictionaryTypeService],
  exports: [DictionaryTypeService],
})
export class DictionaryTypeModule {}
