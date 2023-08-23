import { AutomapperProfile, InjectMapper } from '@automapper/nestjs';
import { Mapper, MappingProfile, createMap } from '@automapper/core';
import { Injectable } from '@nestjs/common';
import { DeviceEntity } from '../entities/device.entity';
import { DeviceVo } from '../vo/device.vo';

@Injectable()
export class DeviceMapperProfile extends AutomapperProfile {
  constructor(@InjectMapper() mapper: Mapper) {
    super(mapper);
  }

  override get profile(): MappingProfile {
    return (mapper: Mapper) => {
      createMap(mapper, DeviceEntity, DeviceVo);
    };
  }
}
