import { AutomapperProfile, InjectMapper } from '@automapper/nestjs';
import { Mapper, MappingProfile, createMap } from '@automapper/core';
import { Injectable } from '@nestjs/common';
import { ApiEntity } from '../entities/api.entity';
import { ApiVo } from '../vo/api.vo';

@Injectable()
export class ApiMapperProfile extends AutomapperProfile {
  constructor(@InjectMapper() mapper: Mapper) {
    super(mapper);
  }

  override get profile(): MappingProfile {
    return (mapper: Mapper) => {
      createMap(mapper, ApiEntity, ApiVo);
    };
  }
}
