import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import * as ExcelJS from "exceljs";
import { CreateOrderDto } from "./dto/create-order.dto";
import { SearchOrderDto } from "./dto/search-order.dto";
import { UpdateOrderDto } from "./dto/update-order.dto";
import { OrderEntity } from "./entities/order.entity";
import * as crypto from "crypto-js";
import { toEntity } from "src/utils/dto2Entity";
import systemConfig from "../../../config/system.config";
import { PageResponseResult } from "src/common/tools/page.response.result";
import { Deleted } from "@/common/enums/deleted.enum";
import { Enabled } from "@/common/enums/enabled.enum";
import { OrderStatus } from "@/common/enums/order.status";
import { orderOpts } from "../../../config/orm.config";
import { orderNumber } from "@/utils";

/*
 *@Description: 订单管理模块业务
 *@Author: 土豆哥
 *@Date: 2023-09-25 22:20:27
 */
@Injectable()
export class OrderService {
  @InjectRepository(OrderEntity, orderOpts.database.toString())
  private readonly orderRepository: Repository<OrderEntity>;

  /**
   * 获取订单分页列表
   * @param searchOrderDto 搜索dto
   */
  async getOrderPageList(searchOrderDto: SearchOrderDto) {
    const { page, keyword } = searchOrderDto;
    const { current, size } = page;
    const skip = (current - 1) * size;
    const queryBuilder = this.orderRepository.createQueryBuilder("o");
    // if (keyword) {
    //   queryBuilder.andWhere(`u.order_name=:orderName`, { orderName: keyword });
    //   queryBuilder.orWhere(`u.phone=:phone`, { phone: keyword });
    // }
    const entities = await queryBuilder
      .orderBy("o.create_time", "DESC")
      .offset(skip)
      .limit(size)
      .getMany();
    page.total = await queryBuilder.getCount();
    const result = new PageResponseResult<OrderEntity[]>(page.total, entities);
    return result;
  }

  /**
   * 获取订单列表
   */
  async getOrderList() {
    const entities = await this.orderRepository
      .createQueryBuilder("u")
      .leftJoinAndSelect("u.roles", "system_roles")
      .where("u.id<>0")
      .getMany();
    return entities;
  }

  /**
   * 根据订单id获取订单信息
   * @param id 主键
   */
  async getOrderById(id: number) {
    const entity = await this.orderRepository
      .createQueryBuilder("u")
      .leftJoinAndSelect("u.roles", "system_roles")
      .andWhere(`u.id=:id`, { id: id })
      .getOne();
    return entity;
  }

  /**
   * 根据订单名称称获取订单信息
   * @param orderName 订单名称称
   */
  async getOrderByOrderName(orderName: string) {
    const entity = await this.orderRepository
      .createQueryBuilder("u")
      .leftJoinAndSelect("u.roles", "system_roles")
      .andWhere(`order_name=:orderName`, { orderName: orderName })
      .getOne();
    return entity;
  }

  /**
   * 创建订单
   * @param createOrderDto 创建订单dto
   */
  async createOrder(createOrderDto: CreateOrderDto) {
    const order = await this.orderRepository.findOneBy({
      orderName: createOrderDto.orderName,
    });
    if (order) {
      throw new HttpException(
        {
          message: "操作失败,订单名称已使用.",
        },
        HttpStatus.BAD_REQUEST
      );
    }
    const orderEntity = new OrderEntity();
    toEntity(createOrderDto, orderEntity);
    orderEntity.orderId = orderNumber();
    orderEntity.deleted = Deleted.NoDeleted;
    orderEntity.status = OrderStatus.Auditing;
    orderEntity.createTime = new Date();
    orderEntity.deliveryTime = new Date(createOrderDto.deliveryTime);
    console.log(
      "orderEntity-aaaaa",
      JSON.stringify(createOrderDto),
      JSON.stringify(orderEntity)
    );

    await this.orderRepository.insert(orderEntity);
  }

  /**
   * 修改订单
   * @param id 主键
   * @param updateOrderDto 修改订单dto
   */
  async updateOrderById(id: number, updateOrderDto: UpdateOrderDto) {
    const order = await this.getById(id);
    if (!order) {
      throw new HttpException(
        {
          message: "操作失败,未找到订单信息.",
        },
        HttpStatus.BAD_REQUEST
      );
    }
    const orderEntity = new OrderEntity();
    toEntity(updateOrderDto, orderEntity);
    await this.orderRepository.update(id, orderEntity);
  }

  /**
   * 删除订单
   * @param id 主键
   */
  async removeOrderById(id: number) {
    await this.orderRepository.delete(id);
  }

  /**
   * 批量删除订单
   * @param id 主键
   */
  async removeOrderByIds(ids: string) {
    const arr = ids.split(",");
    await this.orderRepository.delete(arr);
  }

  private getById(id: number) {
    return this.orderRepository.findOne({
      where: {
        id,
      },
    });
  }
}
