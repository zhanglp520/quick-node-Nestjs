import { AutomapperProfile, InjectMapper } from "@automapper/nestjs";
import { Mapper, MappingProfile, createMap } from "@automapper/core";
import { Injectable } from "@nestjs/common";
import { DictionaryEntity } from "../entities/dictionary.entity";
import { DictionaryVo } from "../vo/dictionary.vo";

@Injectable()
export class DictionaryMapperProfile extends AutomapperProfile {
  constructor(@InjectMapper() mapper: Mapper) {
    super(mapper);
  }

  override get profile(): MappingProfile {
    return (mapper: Mapper) => {
      createMap(mapper, DictionaryEntity, DictionaryVo);
    };
  }
}
