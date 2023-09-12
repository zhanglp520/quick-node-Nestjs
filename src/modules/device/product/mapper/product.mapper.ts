import { AutomapperProfile, InjectMapper } from "@automapper/nestjs";
import { Mapper, MappingProfile, createMap } from "@automapper/core";
import { Injectable } from "@nestjs/common";
import { ProductEntity } from "../entities/product.entity";
import { ProductVo } from "../vo/product.vo";

@Injectable()
export class ProductMapperProfile extends AutomapperProfile {
  constructor(@InjectMapper() mapper: Mapper) {
    console.log("ProductMapperProfile-mapper", mapper);

    super(mapper);
  }

  override get profile(): MappingProfile {
    return (mapper: Mapper) => {
      createMap(mapper, ProductEntity, ProductVo);
    };
  }
}
