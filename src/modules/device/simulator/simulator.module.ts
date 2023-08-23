import { Module } from "@nestjs/common";
import { SimulatorService } from "./simulator.service";
import { SimulatorController } from "./simulator.controller";
import { TypeOrmModule } from "@nestjs/typeorm";
import { DeviceModule } from "../device/device.module";

@Module({
  imports: [DeviceModule],
  controllers: [SimulatorController],
  providers: [SimulatorService],
  exports: [SimulatorService],
})
export class SimulatorModule {}
