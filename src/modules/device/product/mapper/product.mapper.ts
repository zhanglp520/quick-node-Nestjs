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
import { ProductEntity } from "../entities/product.entity";
import { ProductVo } from "../vo/product.vo";
import { DeviceEntity } from "../../device/entities/device.entity";
import { DeviceVo } from "../../device/vo/device.vo";
import { BaseVo } from "@/vos/base.dto";
import { BaseEntity } from "@/entities/base.entity";

class TestEntity {
  id: number;
  name: string;
}

class TestVo {
  id: number;
  name: string;
}

@Injectable()
export class ProductMapperProfile extends AutomapperProfile {
  constructor(@InjectMapper() mapper: Mapper) {
    console.log("ProductMapperProfile-mapper", mapper);
    super(mapper);
  }

  override get profile(): MappingProfile {
    return (mapper: Mapper) => {
      // const baseMapping = createMap(mapper, BaseEntity, BaseVo);
      createMap(
        mapper,
        ProductEntity,
        ProductVo
        // namingConventions(new CamelCaseNamingConvention()),
        // extend(BaseEntity, BaseVo)
        // namingConventions(new PascalCaseNamingConvention()),
        // extend(baseMapping),
        // forMember(
        // (d: ProductVo) => {
        //   console.log("zlp-d.devices", d.devices);
        //   return d.devices;
        // }
        // mapFrom((s: ProductEntity) => {
        // const test = new TestEntity();
        // test.id = 1;
        // test.name = "zs";
        // const vo = mapper.map<TestEntity, TestVo>(
        //   test,
        //   TestEntity,
        //   TestVo,
        //   {}
        // );
        // console.log("zlp2-vo", vo);
        // console.log("zlp-devices", JSON.stringify(s.devices));
        // if (s.devices) {
        //   s.devices.forEach((element) => {
        //     console.log("zlp2-element", JSON.stringify(element));
        //   });
        // }
        // const vos = this.mapper.mapArrayAsync(
        //   s.devices,
        //   DeviceEntity,
        //   DeviceVo
        // );

        //   return [];
        // })
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
