import { AutomapperProfile, InjectMapper } from "@automapper/nestjs";
import {
  CamelCaseNamingConvention,
  Mapper,
  MappingConfiguration,
  MappingProfile,
  PascalCaseNamingConvention,
  createMap,
  extend,
  forMember,
  mapFrom,
  namingConventions,
} from "@automapper/core";
import { Injectable } from "@nestjs/common";
import { DeviceEntity } from "../../device/entities/device.entity";
import { DeviceVo } from "../../device/vo/device.vo";
import { BaseVo } from "@/vos/base.dto";
import { BaseEntity } from "@/entities/base.entity";
import { ProductVo } from "../../product/vo/product.vo";
import { ProductEntity } from "../../product/entities/product.entity";

@Injectable()
export class DeviceMapperProfile extends AutomapperProfile {
  constructor(@InjectMapper() mapper: Mapper) {
    console.log("DeviceMapperProfile-mapper", mapper);
    super(mapper);
  }

  get profile(): MappingProfile {
    return (mapper: Mapper) => {
      // const baseMapping = createMap(mapper, BaseEntity, BaseVo);
      createMap(
        mapper,
        DeviceEntity,
        DeviceVo
        // namingConventions(new CamelCaseNamingConvention()),
        // extend(BaseEntity, BaseVo)
        // namingConventions(new PascalCaseNamingConvention()),
        // extend(baseMapping),
        // forMember(
        //   (d: DeviceVo) => {
        //     console.log("zlp-d.devices", d.product);
        //     return d.product;
        //   },
        //   mapFrom((s: DeviceEntity) => {
        //     console.log("zlp-devices", s.product);
        //     const devices = mapper.map(s.product, ProductEntity, ProductVo);
        //     return devices;
        //   })
        // )
      );
    };
  }

  // protected override get mappingConfigurations(): MappingConfiguration[] {
  //   // return [extend(BaseEntity, BaseVo)];
  //   const baseMapping = createMap(this.mapper, BaseEntity, BaseVo);
  //   return [extend(baseMapping)];
  // }
}
