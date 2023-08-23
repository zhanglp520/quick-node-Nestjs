import { AutomapperProfile, InjectMapper } from '@automapper/nestjs';
import {
  Mapper,
  MappingProfile,
  createMap,
  extend,
  forMember,
  mapFrom,
} from '@automapper/core';
import { Injectable } from '@nestjs/common';
import { UserEntity } from '../entities/user.entity';
import { UserVo } from '../vo/user.vo';
import { UserRoleEntity } from '@/modules/auth/entities/user-role.entity';
import { UserRoleVo } from '@/modules/auth/vo/user-role.vo';
import { RoleEntity } from '../../role/entities/role.entity';
import { BaseEntity } from 'typeorm';
import { BaseVo } from '@/vos/base.dto';
import { RoleVo } from '../../role/vo/role.vo';

@Injectable()
export class UserMapperProfile extends AutomapperProfile {
  constructor(@InjectMapper() mapper: Mapper) {
    console.log('UserMapperProfile-mapper', mapper);

    super(mapper);
  }

  override get profile(): MappingProfile {
    return (mapper: Mapper) => {
      createMap(
        mapper,
        UserEntity,
        UserVo
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
