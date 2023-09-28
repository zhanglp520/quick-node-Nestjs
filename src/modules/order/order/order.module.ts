import { Module } from "@nestjs/common";
import { OrderService } from "./order.service";
import { OrderController } from "./order.controller";
import { TypeOrmModule } from "@nestjs/typeorm";
import { OrderEntity } from "./entities/order.entity";
import { orderOpts } from "../../../config/orm.config";

@Module({
  imports: [
    TypeOrmModule.forRoot(orderOpts),
    TypeOrmModule.forFeature([OrderEntity], orderOpts.database.toString()),
  ],
  controllers: [OrderController],
  providers: [OrderService],
  exports: [OrderService],
})
export class OrderModule {}
