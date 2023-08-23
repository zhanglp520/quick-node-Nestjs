import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { toEntity } from "src/utils/dto2Entity";
import { Repository } from "typeorm";
import { CreatePhysicalModelDto } from "./dto/create-physical-model.dto";
import { SearchPhysicalModelDto } from "./dto/search-physical-model.dto";
import { UpdatePhysicalModelDto } from "./dto/update-physical-model.dto";
import { PhysicalModelEntity } from "./entities/physical-model.entity";
import { AddAttribute } from "./dto/add-attribute.dto";
import { AddFunction } from "./dto/add-function.dto";
import { AddEvent } from "./dto/add-event.dto";

@Injectable()
export class PhysicalModelService {
  @InjectRepository(PhysicalModelEntity, "iot_device_dev")
  private readonly physicalModelRepository: Repository<PhysicalModelEntity>;

  async getPhysicalModelPageList(
    searchPhysicalModelDto: SearchPhysicalModelDto
  ) {
    const { page, keyword } = searchPhysicalModelDto;
    const { current, size } = page;
    const skip = (current - 1) * size;
    const queryBuilder = this.physicalModelRepository.createQueryBuilder();
    if (keyword) {
      queryBuilder.where(`product_id=:productId`, {
        productId: keyword,
      });
    }
    const list = await queryBuilder
      .orderBy("id", "DESC")
      .offset(skip)
      .limit(size)
      .getMany();
    page.total = await this.physicalModelRepository.count();
    return {
      payload: list,
      total: page.total,
    };
  }

  getPhysicalModelList() {
    return this.physicalModelRepository.find();
  }

  getPhysicalModelById(id: number) {
    return this.physicalModelRepository.findOne({
      where: {
        id,
      },
    });
  }

  getPhysicalModelByProductId(productId: number) {
    return this.physicalModelRepository.findOneBy({
      productId,
    });
  }

  async createPhysicalModel(createPhysicalModelDto: CreatePhysicalModelDto) {
    const physicalModel = await this.physicalModelRepository.findOneBy({
      productId: createPhysicalModelDto.productId,
    });
    if (physicalModel) {
      throw new HttpException(
        "操作失败,物模型名已使用.",
        HttpStatus.BAD_REQUEST
      );
    }
    const physicalModelEntity = new PhysicalModelEntity();
    toEntity(createPhysicalModelDto, physicalModelEntity);
    await this.physicalModelRepository.insert(physicalModelEntity);
  }

  async updatePhysicalModelById(
    id: number,
    updatePhysicalModelDto: UpdatePhysicalModelDto
  ) {
    const physicalModel = await this.getPhysicalModelById(id);
    if (!physicalModel) {
      throw new HttpException(
        "操作失败,未找到物模型信息.",
        HttpStatus.BAD_REQUEST
      );
    }
    const physicalModelEntity = new PhysicalModelEntity();
    toEntity(updatePhysicalModelDto, physicalModelEntity);
    await this.physicalModelRepository.update(id, physicalModelEntity);
  }

  async removePhysicalModelById(id: number) {
    await this.physicalModelRepository.delete(id);
  }

  //#region 属性
  async getAttributeList(productId: number) {
    const physicalModel = await this.getPhysicalModelByProductId(productId);
    if (!physicalModel) {
      throw new HttpException("操作失败,物模型不存在.", HttpStatus.BAD_REQUEST);
    }
    const jsonStr = physicalModel.attributes;
    const attributes = jsonStr ? JSON.parse(jsonStr) : [];
    return attributes;
  }
  async getAttributeDetail(productId: number, identifying: string) {
    const physicalModel = await this.getPhysicalModelByProductId(productId);
    if (!physicalModel) {
      throw new HttpException("操作失败,物模型不存在.", HttpStatus.BAD_REQUEST);
    }
    const jsonStr = physicalModel.attributes;
    const attributes = jsonStr ? JSON.parse(jsonStr) : [];
    const atrribute = attributes.find((x) => x.identifying === identifying);
    return atrribute;
  }

  async addAttribute(productId: number, addAttribute: AddAttribute) {
    const physicalModel = await this.getPhysicalModelByProductId(productId);
    if (!physicalModel) {
      throw new HttpException("操作失败,物模型不存在.", HttpStatus.BAD_REQUEST);
    }
    const jsonStr = physicalModel.attributes;
    const attributes = jsonStr ? JSON.parse(jsonStr) : [];
    const index = attributes.indexOf(
      (x) => x.identifying === addAttribute.identifying
    );
    if (index !== -1) {
      throw new HttpException(
        "操作失败,属性标识已占用.",
        HttpStatus.BAD_REQUEST
      );
    }
    attributes.push(addAttribute);
    physicalModel.attributes = JSON.stringify(attributes);
    const physicalModelEntity = new PhysicalModelEntity();
    toEntity(physicalModel, physicalModelEntity);
    await this.physicalModelRepository.update(
      physicalModel.id,
      physicalModelEntity
    );
  }
  async deleteAttribute(productId: number, identifying: string) {
    const physicalModel = await this.getPhysicalModelByProductId(productId);
    if (!physicalModel) {
      throw new HttpException("操作失败,物模型不存在.", HttpStatus.BAD_REQUEST);
    }
    const jsonStr = physicalModel.attributes;
    const attributes = jsonStr ? JSON.parse(jsonStr) : [];
    const attributesNew = attributes.filter(
      (x) => x.identifying !== identifying
    );
    physicalModel.attributes = JSON.stringify(attributesNew);
    const physicalModelEntity = new PhysicalModelEntity();
    toEntity(physicalModel, physicalModelEntity);
    await this.physicalModelRepository.update(
      physicalModel.id,
      physicalModelEntity
    );
  }
  //#endregion

  //#region  功能
  async getFunctionList(productId: number) {
    const physicalModel = await this.getPhysicalModelByProductId(productId);
    if (!physicalModel) {
      throw new HttpException("操作失败,物模型不存在.", HttpStatus.BAD_REQUEST);
    }
    const jsonStr = physicalModel.functions;
    const functions = jsonStr ? JSON.parse(jsonStr) : [];
    return functions;
  }
  async getFunctionDetail(productId: number, identifying: string) {
    const physicalModel = await this.getPhysicalModelByProductId(productId);
    if (!physicalModel) {
      throw new HttpException("操作失败,物模型不存在.", HttpStatus.BAD_REQUEST);
    }
    const jsonStr = physicalModel.functions;
    const functions = jsonStr ? JSON.parse(jsonStr) : [];
    const func = functions.find((x) => x.identifying === identifying);
    return func;
  }

  async addFunction(productId: number, addFunction: AddFunction) {
    const physicalModel = await this.getPhysicalModelByProductId(productId);
    if (!physicalModel) {
      throw new HttpException("操作失败,物模型不存在.", HttpStatus.BAD_REQUEST);
    }
    const jsonStr = physicalModel.functions;
    const functions = jsonStr ? JSON.parse(jsonStr) : [];
    const index = functions.indexOf(
      (x) => x.identifying === functions.identifying
    );
    if (index !== -1) {
      throw new HttpException(
        "操作失败,功能标识已占用.",
        HttpStatus.BAD_REQUEST
      );
    }
    functions.push(addFunction);
    physicalModel.functions = JSON.stringify(functions);
    const physicalModelEntity = new PhysicalModelEntity();
    toEntity(physicalModel, physicalModelEntity);
    await this.physicalModelRepository.update(
      physicalModel.id,
      physicalModelEntity
    );
  }

  async deleteFunction(productId: number, identifying: string) {
    const physicalModel = await this.getPhysicalModelByProductId(productId);
    if (!physicalModel) {
      throw new HttpException("操作失败,物模型不存在.", HttpStatus.BAD_REQUEST);
    }
    const jsonStr = physicalModel.functions;
    const functions = jsonStr ? JSON.parse(jsonStr) : [];
    const functionsNew = functions.filter((x) => x.identifying !== identifying);
    physicalModel.functions = JSON.stringify(functionsNew);
    const physicalModelEntity = new PhysicalModelEntity();
    toEntity(physicalModel, physicalModelEntity);
    await this.physicalModelRepository.update(
      physicalModel.id,
      physicalModelEntity
    );
  }
  //#endregion

  //#region 事件
  async getEventList(productId: number) {
    const physicalModel = await this.getPhysicalModelByProductId(productId);
    if (!physicalModel) {
      throw new HttpException("操作失败,物模型不存在.", HttpStatus.BAD_REQUEST);
    }
    const jsonStr = physicalModel.events;
    const events = jsonStr ? JSON.parse(jsonStr) : [];
    return events;
  }
  async getEventDetail(productId: number, identifying: string) {
    const physicalModel = await this.getPhysicalModelByProductId(productId);
    if (!physicalModel) {
      throw new HttpException("操作失败,物模型不存在.", HttpStatus.BAD_REQUEST);
    }
    const jsonStr = physicalModel.events;
    const events = jsonStr ? JSON.parse(jsonStr) : [];
    const event = events.find((x) => x.identifying === identifying);
    return event;
  }
  async addEvent(productId: number, addEvent: AddEvent) {
    const physicalModel = await this.getPhysicalModelByProductId(productId);
    if (!physicalModel) {
      throw new HttpException("操作失败,物模型不存在.", HttpStatus.BAD_REQUEST);
    }
    const jsonStr = physicalModel.events;
    const events = jsonStr ? JSON.parse(jsonStr) : [];
    const index = events.indexOf((x) => x.identifying === events.identifying);
    if (index !== -1) {
      throw new HttpException(
        "操作失败,事件标识已占用.",
        HttpStatus.BAD_REQUEST
      );
    }
    events.push(addEvent);
    physicalModel.events = JSON.stringify(events);
    const physicalModelEntity = new PhysicalModelEntity();
    toEntity(physicalModel, physicalModelEntity);
    await this.physicalModelRepository.update(
      physicalModel.id,
      physicalModelEntity
    );
  }
  async deleteEvent(productId: number, identifying: string) {
    const physicalModel = await this.getPhysicalModelByProductId(productId);
    if (!physicalModel) {
      throw new HttpException("操作失败,物模型不存在.", HttpStatus.BAD_REQUEST);
    }
    const jsonStr = physicalModel.events;
    const events = jsonStr ? JSON.parse(jsonStr) : [];
    const eventsNew = events.filter((x) => x.identifying !== identifying);
    physicalModel.events = JSON.stringify(eventsNew);
    const physicalModelEntity = new PhysicalModelEntity();
    toEntity(physicalModel, physicalModelEntity);
    await this.physicalModelRepository.update(
      physicalModel.id,
      physicalModelEntity
    );
  }
  //#endregion
}
