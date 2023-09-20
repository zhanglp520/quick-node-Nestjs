import { Module } from "@nestjs/common";
import { ApiService } from "./api.service";
import { ApiController } from "./api.controller";
import { TypeOrmModule } from "@nestjs/typeorm";
import { ApiEntity } from "./entities/api.entity";

@Module({
  imports: [TypeOrmModule.forFeature([ApiEntity])],
  controllers: [ApiController],
  providers: [ApiService],
  exports: [ApiService],
})
export class ApiModule {}
