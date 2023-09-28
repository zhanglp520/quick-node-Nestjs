import { Module } from "@nestjs/common";
import { QQFrendService } from "./qq-frend.service";
import { QQFrendController } from "./qq-frend.controller";
import { TypeOrmModule } from "@nestjs/typeorm";
import { QQFrendEntity } from "./entities/qq-frend.entity";
import { qqOpts } from "../../../config/orm.config";

@Module({
  imports: [
    TypeOrmModule.forRoot(qqOpts),
    TypeOrmModule.forFeature([QQFrendEntity], qqOpts.database.toString()),
  ],
  controllers: [QQFrendController],
  providers: [QQFrendService],
  exports: [QQFrendService],
})
export class QQFrendModule {}
