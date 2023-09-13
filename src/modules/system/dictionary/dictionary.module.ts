import { Module } from "@nestjs/common";
import { DictionaryService } from "./dictionary.service";
import { DictionaryController } from "./dictionary.controller";
import { TypeOrmModule } from "@nestjs/typeorm";
import { DictionaryEntity } from "./entities/dictionary.entity";
import { DictionaryMapperProfile } from "./mapper/dictionary.mapper";

@Module({
  imports: [TypeOrmModule.forFeature([DictionaryEntity])],
  controllers: [DictionaryController],
  providers: [DictionaryService, DictionaryMapperProfile],
  exports: [DictionaryService],
})
export class DictionaryModule {}
