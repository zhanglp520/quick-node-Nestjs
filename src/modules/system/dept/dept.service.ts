import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { toEntity } from 'src/utils/dto2Entity';
import { Repository } from 'typeorm';
import { CreateDeptDto } from './dto/create-dept.dto';
import { SearchDeptDto } from './dto/search-dept.dto';
import { UpdateDeptDto } from './dto/update-dept.dto';
import { DeptEntity } from './entities/dept.entity';

@Injectable()
export class DeptService {
  @InjectRepository(DeptEntity)
  private readonly deptRepository: Repository<DeptEntity>;

  getDeptByPId(pId: string) {
    return this.deptRepository.find({
      where: {
        pId,
      },
    });
  }

  getDeptList() {
    return this.deptRepository.find();
  }

  getDeptById(id: number) {
    return this.deptRepository.findOne({
      where: {
        id,
      },
    });
  }

  getDeptByDeptName(deptName: string) {
    return this.deptRepository.findOneBy({
      deptName,
    });
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
