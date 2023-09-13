import { Module } from "@nestjs/common";
import { MenuService } from "./menu.service";
import { MenuController } from "./menu.controller";
import { ChatModule } from "../../chat/chat.module";
import { TypeOrmModule } from "@nestjs/typeorm";
import { MenuEntity } from "./entities/menu.entity";
import { MenuMapperProfile } from "./mapper/menu.mapper";

@Module({
  // imports: [ChatModule],
  imports: [TypeOrmModule.forFeature([MenuEntity]), ChatModule],
  controllers: [MenuController],
  providers: [MenuService, MenuMapperProfile],
  exports: [MenuService],
})
export class MenuModule {}
