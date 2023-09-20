import { Module } from "@nestjs/common";
import { MenuService } from "./menu.service";
import { MenuController } from "./menu.controller";
import { ChatModule } from "../../chat/chat.module";
import { TypeOrmModule } from "@nestjs/typeorm";
import { MenuEntity } from "./entities/menu.entity";

@Module({
  // imports: [ChatModule],
  imports: [TypeOrmModule.forFeature([MenuEntity]), ChatModule],
  controllers: [MenuController],
  providers: [MenuService],
  exports: [MenuService],
})
export class MenuModule {}
