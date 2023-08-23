import { AutomapperProfile, InjectMapper } from "@automapper/nestjs";
import { Mapper, MappingProfile, createMap } from "@automapper/core";
import { Injectable } from "@nestjs/common";
import { DictionaryTypeEntity } from "../entities/dictionary-type.entity";
import { DictionaryTypeVo } from "../vo/dictionary-type.vo";

@Injectable()
export class DictionaryTypeMapperProfile extends AutomapperProfile {
  constructor(@InjectMapper() mapper: Mapper) {
    super(mapper);
  }

  override get profile(): MappingProfile {
    return (mapper: Mapper) => {
      createMap(mapper, DictionaryTypeEntity, DictionaryTypeVo);
    };
  }
}
