import { Module } from "@nestjs/common";
import { QQGroupService } from "./qq-group.service";
import { QQGroupController } from "./qq-group.controller";
import { TypeOrmModule } from "@nestjs/typeorm";
import { QQGroupEntity } from "./entities/qq-group.entity";
import { QQGroupMapperProfile } from "./mapper/qq-group.mapper";
import { qqOpts } from "../../../config/orm.config";

@Module({
  imports: [
    TypeOrmModule.forRoot(qqOpts),
    TypeOrmModule.forFeature([QQGroupEntity], qqOpts.database.toString()),
  ],
  controllers: [QQGroupController],
  providers: [QQGroupService, QQGroupMapperProfile],
  exports: [QQGroupService],
})
export class QQGroupModule {}
