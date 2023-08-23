import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { toEntity } from 'src/utils/dto2Entity';
import { Repository } from 'typeorm';
import { CreateDeptDto } from './dto/create-dept.dto';
import { UpdateDeptDto } from './dto/update-dept.dto';
import { DeptEntity } from './entities/dept.entity';
import { Mapper } from '@automapper/core';
import { DeptVo } from './vo/dept.vo';
import { InjectMapper } from '@automapper/nestjs';

@Injectable()
export class DeptService {
  constructor(@InjectMapper() mapper: Mapper) {
    this.mapper = mapper;
  }

  private readonly mapper: Mapper;
  @InjectRepository(DeptEntity)
  private readonly deptRepository: Repository<DeptEntity>;

  async getDeptByPId(pId: string): Promise<DeptVo[]> {
    const entities = await this.deptRepository.find({
      where: {
        pId,
      },
    });
    const vos = await this.mapper.mapArrayAsync(entities, DeptEntity, DeptVo);
    return vos;
  }

  async getDeptList() {
    const entities = await this.deptRepository.find();
    const vos = await this.mapper.mapArrayAsync(entities, DeptEntity, DeptVo);
    return vos;
  }

  async getDeptById(id: number): Promise<DeptVo> {
    const entity = await this.deptRepository.findOne({
      where: {
        id,
      },
    });
    const vo = await this.mapper.mapAsync(entity, DeptEntity, DeptVo);
    return vo;
  }

  async getDeptByDeptName(deptName: string): Promise<DeptVo> {
    const entity = await this.deptRepository.findOneBy({
      deptName,
    });
    const vo = await this.mapper.mapAsync(entity, DeptEntity, DeptVo);
    return vo;
  }

  async createDept(createDeptDto: CreateDeptDto) {
    const dept = await this.deptRepository.findOneBy({
      deptName: createDeptDto.deptName,
    });
    if (dept) {
      throw new HttpException('操作失败,部门名已使用.', HttpStatus.BAD_REQUEST);
    }
    const deptEntity = new DeptEntity();
    toEntity(createDeptDto, deptEntity);
    await this.deptRepository.insert(deptEntity);
  }

  async updateDeptById(id: number, updateDeptDto: UpdateDeptDto) {
    const dept = await this.getDeptById(id);
    if (!dept) {
      throw new HttpException(
        '操作失败,未找到部门信息.',
        HttpStatus.BAD_REQUEST
      );
    }
    const deptEntity = new DeptEntity();
    toEntity(updateDeptDto, deptEntity);
    await this.deptRepository.update(id, deptEntity);
  }

  async removeDeptById(id: number) {
    await this.deptRepository.delete(id);
  }
}
