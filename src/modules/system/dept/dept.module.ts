import { Module } from "@nestjs/common";
import { DeptService } from "./dept.service";
import { DeptController } from "./dept.controller";
import { TypeOrmModule } from "@nestjs/typeorm";
import { DeptEntity } from "./entities/dept.entity";

@Module({
  imports: [TypeOrmModule.forFeature([DeptEntity])],
  controllers: [DeptController],
  providers: [DeptService],
  exports: [DeptService],
})
export class DeptModule {}
