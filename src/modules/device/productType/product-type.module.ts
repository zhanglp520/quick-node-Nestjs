import { Module } from "@nestjs/common";
import { ProductTypeService } from "./product-type.service";
import { ProductTypeController } from "./product-type.controller";
import { TypeOrmModule } from "@nestjs/typeorm";
import { ProductTypeEntity } from "./entities/product-type.entity";
import { iotOpts } from "../../../config/orm.config";

@Module({
  imports: [
    TypeOrmModule.forRoot(iotOpts),
    TypeOrmModule.forFeature([ProductTypeEntity], "iot_device_dev"),
  ],
  controllers: [ProductTypeController],
  providers: [ProductTypeService],
  exports: [ProductTypeService],
})
export class ProductTypeModule {}
