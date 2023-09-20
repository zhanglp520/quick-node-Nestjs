import { Module } from "@nestjs/common";
import { ProductService } from "./product.service";
import { ProductController } from "./product.controller";
import { TypeOrmModule } from "@nestjs/typeorm";
import { ProductEntity } from "./entities/product.entity";
import { PhysicalModel } from "../physicalModel/physical-model.module";
import { iotOpts } from "../../../config/orm.config";

@Module({
  imports: [
    TypeOrmModule.forRoot(iotOpts),
    TypeOrmModule.forFeature([ProductEntity], "iot_device_dev"),
    PhysicalModel,
  ],
  controllers: [ProductController],
  providers: [ProductService],
  exports: [ProductService],
})
export class ProductModule {}
