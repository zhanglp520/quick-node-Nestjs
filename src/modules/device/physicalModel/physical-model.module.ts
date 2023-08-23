import { Module } from "@nestjs/common";
import { PhysicalModelService } from "./physical-model.service";
import { PhysicalModelController } from "./physical-model.controller";
import { TypeOrmModule } from "@nestjs/typeorm";
import { PhysicalModelEntity } from "./entities/physical-model.entity";
import { iotOpts } from "../../../config/orm.config";

@Module({
  imports: [
    TypeOrmModule.forRoot(iotOpts),
    TypeOrmModule.forFeature([PhysicalModelEntity], "iot_device_dev"),
  ],
  controllers: [PhysicalModelController],
  providers: [PhysicalModelService],
  exports: [PhysicalModelService],
})
export class PhysicalModel {}
