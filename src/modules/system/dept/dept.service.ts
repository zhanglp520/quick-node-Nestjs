import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { toEntity } from "src/utils/dto2Entity";
import { Repository } from "typeorm";
import { CreateDeptDto } from "./dto/create-dept.dto";
import { UpdateDeptDto } from "./dto/update-dept.dto";
import { DeptEntity } from "./entities/dept.entity";

@Injectable()
export class DeptService {
  @InjectRepository(DeptEntity)
  private readonly deptRepository: Repository<DeptEntity>;

  /**
   * 获取部门分页列表
   * @param searchDeptDto 搜索dto
   */
  async getDeptByPId(pId: string) {
    const entities = await this.deptRepository.find({
      where: {
        pId,
      },
    });
    return entities;
  }

  /**
   * 获取部门列表
   */
  async getDeptList() {
    const entities = await this.deptRepository.find();
    return entities;
  }

  /**
   * 根据部门id获取部门信息
   * @param id 主键
   */
  async getDeptById(id: number) {
    const entity = await this.deptRepository.findOne({
      where: {
        id,
      },
    });
    return entity;
  }

  /**
   * 根据部门名称获取部门信息
   * @param deptName 部门名称
   */
  async getDeptByDeptName(deptName: string) {
    const entity = await this.deptRepository.findOneBy({
      deptName,
    });
    return entity;
  }

  /**
   * 创建部门
   * @param createDeptDto 创建部门dto
   */
  async createDept(createDeptDto: CreateDeptDto) {
    const dept = await this.deptRepository.findOneBy({
      deptName: createDeptDto.deptName,
    });
    if (dept) {
      throw new HttpException("操作失败,部门名已使用.", HttpStatus.BAD_REQUEST);
    }
    const deptEntity = new DeptEntity();
    toEntity(createDeptDto, deptEntity);
    await this.deptRepository.insert(deptEntity);
  }

  /**
   * 修改部门
   * @param id 主键
   * @param updateDeptDto 修改部门dto
   */
  async updateDeptById(id: number, updateDeptDto: UpdateDeptDto) {
    const dept = await this.getDeptById(id);
    if (!dept) {
      throw new HttpException(
        "操作失败,未找到部门信息.",
        HttpStatus.BAD_REQUEST
      );
    }
    const deptEntity = new DeptEntity();
    toEntity(updateDeptDto, deptEntity);
    await this.deptRepository.update(id, deptEntity);
  }

  /**
   * 删除部门
   * @param id 主键
   */
  async removeDeptById(id: number) {
    await this.deptRepository.delete(id);
  }
}
