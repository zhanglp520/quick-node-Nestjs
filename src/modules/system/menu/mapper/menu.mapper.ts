import { AutomapperProfile, InjectMapper } from "@automapper/nestjs";
import { Mapper, MappingProfile, createMap } from "@automapper/core";
import { Injectable } from "@nestjs/common";
import { MenuEntity } from "../entities/menu.entity";
import { MenuVo } from "../vo/menu.vo";

@Injectable()
export class MenuMapperProfile extends AutomapperProfile {
  constructor(@InjectMapper() mapper: Mapper) {
    super(mapper);
  }

  override get profile(): MappingProfile {
    return (mapper: Mapper) => {
      createMap(mapper, MenuEntity, MenuVo);
    };
  }
}
