import { HttpException, HttpStatus, Inject, Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { toEntity } from "src/utils/dto2Entity";
import { Repository } from "typeorm";
import { CreateDeviceDto } from "./dto/create-device.dto";
import { SearchDeviceDto } from "./dto/search-device.dto";
import { UpdateDeviceDto } from "./dto/update-device.dto";
import { DeviceEntity } from "./entities/device.entity";
import { PhysicalModelService } from "../physicalModel/physical-model.service";
import { AttributeEntity } from "./entities/attribute.entity";
import { SearchAttributeDto } from "./dto/search-attribute.dto";
import { CreateAttributeDto } from "./dto/create-attribute.dto";
import { SearchFunctionDto } from "./dto/search-function.dto";
import { FunctionEntity } from "./entities/function.entity";
import { EventEntity } from "./entities/event.entity";
import { CreateFunctionDto } from "./dto/create-function.dto";
import { CreateEventDto } from "./dto/create-event.dto";

@Injectable()
export class DeviceService {
  @InjectRepository(DeviceEntity, "iot_device_dev")
  private readonly deviceRepository: Repository<DeviceEntity>;
  @InjectRepository(FunctionEntity, "iot_device_dev")
  private readonly functionRepository: Repository<FunctionEntity>;
  @InjectRepository(AttributeEntity, "iot_device_dev")
  private readonly attributeRepository: Repository<AttributeEntity>;
  @InjectRepository(EventEntity, "iot_device_dev")
  private readonly eventRepository: Repository<EventEntity>;
  constructor(
    @Inject(PhysicalModelService)
    private readonly physicalModelService: PhysicalModelService
  ) {}

  async getDevicePageList(searchDeviceDto: SearchDeviceDto) {
    const { page, keyword, productId } = searchDeviceDto;
    const { current, size } = page;
    const skip = (current - 1) * size;
    const queryBuilder = this.deviceRepository.createQueryBuilder();
    queryBuilder.where("id<>0");
    if (keyword) {
      queryBuilder.andWhere(`user_name=:userName`, { userName: keyword });
      queryBuilder.orWhere(`phone=:phone`, { phone: keyword });
    }
    const list = await queryBuilder
      .orderBy("create_time", "DESC")
      .offset(skip)
      .limit(size)
      .getMany();
    page.total = await this.deviceRepository.count();
    return {
      payload: list,
      total: page.total,
    };
  }

  // async getDevicePageList(searchDeviceDto: SearchDeviceDto) {
  //   const { page, keyword, productId } = searchDeviceDto;
  //   const { current, size } = page;
  //   const skip = (current - 1) * size;
  //   const queryBuilder = this.deviceRepository.createQueryBuilder();
  //   if (productId) {
  //     queryBuilder.where(`product_id=:productId`, { productId: productId });
  //     if (keyword) {
  //       queryBuilder.orWhere(`device_id=:deviceId`, { deviceId: keyword });
  //       queryBuilder.orWhere(`device_name=:deviceName`, {
  //         deviceName: keyword,
  //       });
  //     }
  //   } else {
  //     if (keyword) {
  //       queryBuilder.where(`device_id=:deviceId`, { deviceId: keyword });
  //       queryBuilder.orWhere(`device_name=:deviceName`, {
  //         deviceName: keyword,
  //       });
  //     }
  //   }

  //   const list = await queryBuilder
  //     .orderBy('create_time', 'DESC')
  //     .offset(skip)
  //     .limit(size)
  //     .getMany();
  //   page.total = await this.deviceRepository.count();
  //   return {
  //     payload: list,
  //     total: page.total,
  //   };
  // }

  getDeviceList(productId?: number) {
    console.log("getDeviceList", {
      productId,
    });

    if (productId == undefined) {
      return this.deviceRepository.find();
    } else {
      return this.deviceRepository.find({
        where: {
          productId: productId,
        },
      });
    }
  }

  getDeviceById(id: number) {
    return this.deviceRepository.findOne({
      where: {
        id,
      },
    });
  }

  getDeviceByDeviceName(deviceName: string) {
    return this.deviceRepository.findOneBy({
      deviceName,
    });
  }

  async createDevice(createDeviceDto: CreateDeviceDto) {
    const device = await this.deviceRepository.findOneBy({
      deviceName: createDeviceDto.deviceName,
    });
    if (device) {
      throw new HttpException("操作失败,设备名已使用.", HttpStatus.BAD_REQUEST);
    }
    const deviceEntity = new DeviceEntity();
    toEntity(createDeviceDto, deviceEntity);
    deviceEntity.enabled = true;
    deviceEntity.status = false;
    deviceEntity.createTime = new Date();
    await this.deviceRepository.insert(deviceEntity);
  }

  async updateDeviceById(id: number, updateDeviceDto: UpdateDeviceDto) {
    const device = await this.getDeviceById(id);
    if (!device) {
      throw new HttpException(
        "操作失败,未找到设备信息.",
        HttpStatus.BAD_REQUEST
      );
    }
    const deviceEntity = new DeviceEntity();
    toEntity(updateDeviceDto, deviceEntity);
    await this.deviceRepository.update(id, deviceEntity);
  }

  async removeDeviceById(id: number) {
    await this.deviceRepository.delete(id);
  }
  async enabledDeviceById(id: number) {
    const deviceEntity = new DeviceEntity();
    deviceEntity.enabled = true;
    await this.deviceRepository.update(id, deviceEntity);
  }
  async disableDeviceById(id: number) {
    const deviceEntity = new DeviceEntity();
    deviceEntity.enabled = false;
    await this.deviceRepository.update(id, deviceEntity);
  }
  //#region 属性
  async getAttributePageList(searchAttributeDto: SearchAttributeDto) {
    const { page, keyword, deviceId, identifying } = searchAttributeDto;
    const { current, size } = page;
    const skip = (current - 1) * size;
    const queryBuilder = this.attributeRepository.createQueryBuilder();
    queryBuilder.where(`device_id=:deviceId`, {
      deviceId: deviceId,
    });
    queryBuilder.andWhere(`identifying=:identifying`, {
      identifying: identifying,
    });
    if (keyword) {
      // queryBuilder.where(`device_id=:deviceId`, {
      //   deviceId: keyword,
      // });
    }
    const list = await queryBuilder
      .orderBy("create_time", "DESC")
      .offset(skip)
      .limit(size)
      .getMany();
    page.total = await this.attributeRepository.count();
    return {
      payload: list,
      total: page.total,
    };
  }
  async getAttribute(searchAttributeDto: SearchAttributeDto) {
    const { deviceId, identifying } = searchAttributeDto;
    const queryBuilder = this.attributeRepository.createQueryBuilder();
    queryBuilder.where(`device_id=:deviceId`, {
      deviceId: deviceId,
    });
    queryBuilder.andWhere(`identifying=:identifying`, {
      identifying: identifying,
    });
    const list = await queryBuilder.orderBy("create_time", "DESC").getMany();
    return list && list[0];
  }
  async reportAttribute(createAttributeDto: CreateAttributeDto) {
    const attributeEntity = new AttributeEntity();
    toEntity(createAttributeDto, attributeEntity);
    attributeEntity.createTime = new Date();
    await this.attributeRepository.insert(attributeEntity);
  }
  //#endregion

  //#region 功能
  async getFunctionPageList(searchFunctionDto: SearchFunctionDto) {
    const { page, keyword, deviceId, identifying } = searchFunctionDto;
    const { current, size } = page;
    const skip = (current - 1) * size;
    const queryBuilder = this.functionRepository.createQueryBuilder();
    queryBuilder.where(`device_id=:deviceId`, {
      deviceId: deviceId,
    });
    if (keyword) {
      // queryBuilder.where(`device_id=:deviceId`, {
      //   deviceId: keyword,
      // });
    }
    const list = await queryBuilder
      .orderBy("create_time", "DESC")
      .offset(skip)
      .limit(size)
      .getMany();
    page.total = await this.functionRepository.count();
    return {
      payload: list,
      total: page.total,
    };
  }
  async callFunction(createFunctionDto: CreateFunctionDto) {
    createFunctionDto.inputParams = JSON.stringify(
      createFunctionDto.inputParams
    );
    createFunctionDto.outParams = JSON.stringify(createFunctionDto.outParams);
    const functionEntity = new FunctionEntity();
    toEntity(createFunctionDto, functionEntity);
    functionEntity.createTime = new Date();
    console.log("callFunction", functionEntity);
    await this.functionRepository.insert(functionEntity);
  }
  //#endregion

  //#region 事件
  async getEventPageList(searchFunctionDto: SearchFunctionDto) {
    const { page, keyword, deviceId, identifying } = searchFunctionDto;
    const { current, size } = page;
    const skip = (current - 1) * size;
    const queryBuilder = this.eventRepository.createQueryBuilder();
    queryBuilder.where(`device_id=:deviceId`, {
      deviceId: deviceId,
    });
    if (keyword) {
      // queryBuilder.where(`device_id=:deviceId`, {
      //   deviceId: keyword,
      // });
    }
    const list = await queryBuilder
      .orderBy("create_time", "DESC")
      .offset(skip)
      .limit(size)
      .getMany();
    page.total = await this.eventRepository.count();
    return {
      payload: list,
      total: page.total,
    };
  }
  async triggerEvent(createEventDto: CreateEventDto) {
    console.log("triggerEvent", createEventDto);
    createEventDto.inputParams = JSON.stringify(createEventDto.inputParams);
    const eventEntity = new EventEntity();
    toEntity(createEventDto, eventEntity);
    eventEntity.createTime = new Date();
    console.log("triggerEvent", eventEntity);
    await this.eventRepository.insert(eventEntity);
  }
  //#endregion
}
