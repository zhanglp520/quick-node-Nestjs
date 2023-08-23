import { Module } from "@nestjs/common";
import { DictionaryTypeService } from "./dictionary-type.service";
import { DictionaryTypeController } from "./dictionary-type.controller";
import { TypeOrmModule } from "@nestjs/typeorm";
import { DictionaryTypeEntity } from "./entities/dictionary-type.entity";
import { DictionaryTypeMapperProfile } from "./mapper/dept.mapper";

@Module({
  imports: [TypeOrmModule.forFeature([DictionaryTypeEntity])],
  controllers: [DictionaryTypeController],
  providers: [DictionaryTypeService, DictionaryTypeMapperProfile],
  exports: [DictionaryTypeService],
})
export class DictionaryTypeModule {}
