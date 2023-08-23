import { Module } from "@nestjs/common";
import { DeviceService } from "./device.service";
import { DeviceController } from "./device.controller";
import { TypeOrmModule } from "@nestjs/typeorm";
import { DeviceEntity } from "./entities/device.entity";
import { PhysicalModel } from "../physicalModel/physical-model.module";
import { AttributeEntity } from "./entities/attribute.entity";
import { FunctionEntity } from "./entities/function.entity";
import { EventEntity } from "./entities/event.entity";
import { iotOpts } from "../../../config/orm.config";

@Module({
  imports: [
    TypeOrmModule.forRoot(iotOpts),
    TypeOrmModule.forFeature(
      [DeviceEntity, AttributeEntity, FunctionEntity, EventEntity],
      "iot_device_dev"
    ),
    PhysicalModel,
  ],
  controllers: [DeviceController],
  providers: [DeviceService],
  exports: [DeviceService],
})
export class DeviceModule {}
