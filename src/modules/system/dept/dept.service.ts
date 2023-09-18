import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { toEntity } from "src/utils/dto2Entity";
import { Repository } from "typeorm";
import { CreateDeptDto } from "./dto/create-dept.dto";
import { UpdateDeptDto } from "./dto/update-dept.dto";
import { DeptEntity } from "./entities/dept.entity";
import { Mapper } from "@automapper/core";
import { InjectMapper } from "@automapper/nestjs";
import { ResponseStatus } from "@/common/enums/response-status.enum";
import { ResponseResult } from "@/common/tools/response.result";

@Injectable()
export class DeptService {
  constructor(@InjectMapper() mapper: Mapper) {
    this.mapper = mapper;
  }

  private readonly mapper: Mapper;
  @InjectRepository(DeptEntity)
  private readonly deptRepository: Repository<DeptEntity>;

  /**
   * 获取部门分页列表
   * @param searchDeptDto 搜索dto
   * @returns : Promise<ResponseResult<DeptEntity[]>>
   */
  async getDeptByPId(pId: string): Promise<ResponseResult<DeptEntity[]>> {
    const entities = await this.deptRepository.find({
      where: {
        pId,
      },
    });
    const result = new ResponseResult<DeptEntity[]>(
      ResponseStatus.success,
      "操作成功",
      entities
    );
    return result;
  }

  /**
   * 获取部门列表
   * @returns : Promise<ResponseResult<DeptEntity[]>>
   */
  async getDeptList(): Promise<ResponseResult<DeptEntity[]>> {
    const entities = await this.deptRepository.find();
    const result = new ResponseResult<DeptEntity[]>(
      ResponseStatus.success,
      "操作成功",
      entities
    );
    return result;
  }

  /**
   * 根据部门id获取部门信息
   * @param id 主键
   * @returns Promise<ResponseResult<DeptEntity>>
   */
  async getDeptById(id: number): Promise<ResponseResult<DeptEntity>> {
    const entity = await this.deptRepository.findOne({
      where: {
        id,
      },
    });
    const result = new ResponseResult<DeptEntity>(
      ResponseStatus.success,
      "操作成功",
      entity
    );
    return result;
  }

  /**
   * 根据部门名称获取部门信息
   * @param deptName 部门名称
   * @returns Promise<ResponseResult<DeptEntity>>
   */
  async getDeptByDeptName(
    deptName: string
  ): Promise<ResponseResult<DeptEntity>> {
    const entity = await this.deptRepository.findOneBy({
      deptName,
    });
    const result = new ResponseResult<DeptEntity>(
      ResponseStatus.success,
      "操作成功",
      entity
    );
    return result;
  }

  /**
   * 创建部门
   * @param createDeptDto 创建部门dto
   * @returns  Promise<ResponseResult>
   */
  async createDept(createDeptDto: CreateDeptDto): Promise<ResponseResult> {
    const dept = await this.deptRepository.findOneBy({
      deptName: createDeptDto.deptName,
    });
    if (dept) {
      throw new HttpException("操作失败,部门名已使用.", HttpStatus.BAD_REQUEST);
    }
    const deptEntity = new DeptEntity();
    toEntity(createDeptDto, deptEntity);
    await this.deptRepository.insert(deptEntity);
    const result = new ResponseResult(ResponseStatus.success, "操作成功");
    return result;
  }

  /**
   * 修改部门
   * @param id 主键
   * @param updateDeptDto 修改部门dto
   * @returns Promise<ResponseResult>
   */
  async updateDeptById(
    id: number,
    updateDeptDto: UpdateDeptDto
  ): Promise<ResponseResult> {
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
    const result = new ResponseResult(ResponseStatus.success, "操作成功");
    return result;
  }

  /**
   * 删除部门
   * @param id 主键
   * @returns  Promise<ResponseResult>
   */
  async removeDeptById(id: number): Promise<ResponseResult> {
    await this.deptRepository.delete(id);
    const result = new ResponseResult(ResponseStatus.success, "操作成功");
    return result;
  }
}
