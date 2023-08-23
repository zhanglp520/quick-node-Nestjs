import { Module } from '@nestjs/common';
import { DeptService } from './dept.service';
import { DeptController } from './dept.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DeptEntity } from './entities/dept.entity';
import { DeptMapperProfile } from './mapper/dept.mapper';

@Module({
  imports: [TypeOrmModule.forFeature([DeptEntity])],
  controllers: [DeptController],
  providers: [DeptService, DeptMapperProfile],
  exports: [DeptService],
})
export class DeptModule {}
