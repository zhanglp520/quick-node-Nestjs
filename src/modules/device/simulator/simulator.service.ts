import iot, {
  IConnectResult,
  IMessageResult,
  IOTConfig,
} from "@ainiteam/quick-iot-device-sdk";
import { PhysicalModelService } from "../physicalModel/physical-model.service";
import { Inject } from "@nestjs/common";
import { DeviceService } from "../device/device.service";
import { CreateAttributeDto } from "../device/dto/create-attribute.dto";
import { CreateFunctionDto } from "../device/dto/create-function.dto";
import { CreateEventDto } from "../device/dto/create-event.dto";

export class SimulatorService {
  constructor(
    @Inject(DeviceService)
    private readonly deviceService: DeviceService
  ) {}

  reportAttribute(productId: number, deviceId: number, props: any) {
    console.log("reportAttribute-props", props);
    const obj = props;
    for (const key in obj) {
      if (Object.prototype.hasOwnProperty.call(obj, key)) {
        const createAttributeDto = new CreateAttributeDto();
        const element = obj[key];
        createAttributeDto.identifying = key;
        createAttributeDto.value = element;
        createAttributeDto.deviceId = deviceId;
        this.deviceService.reportAttribute(createAttributeDto);
      }
    }
  }
  callFunction(
    productId: number,
    deviceId: number,
    identifying: string,
    json: any
  ) {
    const { inputParams, outParams } = json;
    const createFunctionDto = new CreateFunctionDto();
    createFunctionDto.identifying = identifying;
    createFunctionDto.inputParams = inputParams;
    createFunctionDto.outParams = outParams;
    createFunctionDto.deviceId = deviceId;
    this.deviceService.callFunction(createFunctionDto);
  }
  triggerEvent(
    productId: number,
    deviceId: number,
    identifying: string,
    json: any
  ) {
    const { inputParams } = json;
    const createEventDto = new CreateEventDto();
    createEventDto.identifying = identifying;
    createEventDto.inputParams = inputParams;
    createEventDto.deviceId = deviceId;
    this.deviceService.triggerEvent(createEventDto);
  }
}
