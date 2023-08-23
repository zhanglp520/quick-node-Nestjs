import {
  Controller,
  Query,
  Patch,
  Get,
  Post,
  Param,
  Body,
} from "@nestjs/common";
import { SimulatorService } from "./simulator.service";

@Controller("device/simulators")
export class SimulatorController {
  constructor(private readonly simulatorService: SimulatorService) {}

  @Get("getStatus/:productId/:deviceId")
  getStatus(
    @Param("productId") productId: number,
    @Param("deviceId") deviceId: number
  ) {
    return null;
  }

  @Patch("online/:productId/:deviceId")
  online(
    @Param("productId") productId: number,
    @Param("deviceId") deviceId: number
  ) {
    return null;
  }

  @Patch("offline/:productId/:deviceId")
  offline(
    @Param("productId") productId: number,
    @Param("deviceId") deviceId: number
  ) {
    return null;
  }

  @Post("reportAttribute/:productId/:deviceId")
  reportAttribute(
    @Param("productId") productId: number,
    @Param("deviceId") deviceId: number,
    @Body() json: string
  ) {
    return null;
  }
  @Post("callFunction/:productId/:deviceId/:identifying")
  callFunction(
    @Param("productId") productId: number,
    @Param("deviceId") deviceId: number,
    @Param("identifying") identifying: string,
    @Body() json: string
  ) {
    return this.simulatorService.callFunction(
      productId,
      deviceId,
      identifying,
      json
    );
  }
  @Post("triggerEvent/:productId/:deviceId/:identifying")
  triggerEvent(
    @Param("productId") productId: number,
    @Param("deviceId") deviceId: number,
    @Param("identifying") identifying: string,
    @Body() json: string
  ) {
    return this.simulatorService.triggerEvent(
      productId,
      deviceId,
      identifying,
      json
    );
  }
}
