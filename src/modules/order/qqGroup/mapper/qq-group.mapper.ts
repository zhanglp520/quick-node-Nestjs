import { AutomapperProfile, InjectMapper } from "@automapper/nestjs";
import { Mapper, MappingProfile, createMap } from "@automapper/core";
import { Injectable } from "@nestjs/common";
import { QQGroupEntity } from "../entities/qq-group.entity";
import { QQGroupVo } from "../vo/qq-group.vo";

@Injectable()
export class QQGroupMapperProfile extends AutomapperProfile {
  constructor(@InjectMapper() mapper: Mapper) {
    console.log("QQGroupMapperProfile-mapper", mapper);

    super(mapper);
  }

  override get profile(): MappingProfile {
    return (mapper: Mapper) => {
      createMap(
        mapper,
        QQGroupEntity,
        QQGroupVo
        // forMember(
        //   (d) => {
        //     return d.roles;
        //   },
        //   mapFrom((s) => {
        //     const ids = this.mapper.mapArray(s.roles, RoleEntity, RoleVo);
        //     return s.roles;
        //   })
        // )
      );
      // extend(BaseEntity, BaseVo);
    };
  }

  // protected get mappingConfigurations(): MappingConfiguration[] {
  //   return [extend(BaseEntity, BaseDto)];
  // }
}
