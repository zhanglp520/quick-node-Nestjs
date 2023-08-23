import { AutomapperProfile, InjectMapper } from '@automapper/nestjs';
import { Mapper, MappingProfile, createMap } from '@automapper/core';
import { Injectable } from '@nestjs/common';
import { UserRoleEntity } from '../entities/user-role.entity';
import { UserRoleVo } from '../vo/user-role.vo';

@Injectable()
export class AuthMapperProfile extends AutomapperProfile {
  constructor(@InjectMapper() mapper: Mapper) {
    super(mapper);
  }

  override get profile(): MappingProfile {
    return (mapper: Mapper) => {
      createMap(mapper, UserRoleEntity, UserRoleVo);
    };
  }
}
