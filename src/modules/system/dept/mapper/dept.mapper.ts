import { AutomapperProfile, InjectMapper } from "@automapper/nestjs";
import { Mapper, MappingProfile, createMap, extend } from "@automapper/core";
import { Injectable } from "@nestjs/common";
import { DeptEntity } from "../entities/dept.entity";
import { DeptVo } from "../vo/dept.vo";

@Injectable()
export class DeptMapperProfile extends AutomapperProfile {
  constructor(@InjectMapper() mapper: Mapper) {
    super(mapper);
  }

  override get profile(): MappingProfile {
    return (mapper: Mapper) => {
      createMap(mapper, DeptEntity, DeptVo);
    };
  }
}
