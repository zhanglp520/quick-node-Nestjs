import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { toEntity } from "src/utils/dto2Entity";
import { Repository } from "typeorm";
import { CreateMenuDto } from "./dto/create-menu.dto";
import { SearchMenuDto } from "./dto/search-menu.dto";
import { UpdateMenuDto } from "./dto/update-menu.dto";
import { MenuEntity } from "./entities/menu.entity";
import { PageResponseResult } from "@/common/tools/page.response.result";
import { ResponseStatus } from "@/common/enums/response-status.enum";
import { ResponseResult } from "@/common/tools/response.result";

@Injectable()
export class MenuService {
  @InjectRepository(MenuEntity)
  private readonly menuRepository: Repository<MenuEntity>;

  /**
   * 获取菜单分页列表
   * @param searchMenuDto 搜索dto
   * @returns Promise<PageResponseResult<MenuEntity[]>>
   */
  async getMenuPageList(
    searchMenuDto: SearchMenuDto
  ): Promise<PageResponseResult<MenuEntity[]>> {
    const { page, keyword } = searchMenuDto;
    const { current, size } = page;
    const skip = (current - 1) * size;
    const queryBuilder = this.menuRepository.createQueryBuilder();
    if (keyword) {
      queryBuilder.where(`menu_name=:menuName`, { menuName: keyword });
    }
    const entities = await queryBuilder
      .orderBy("create_time", "DESC")
      .offset(skip)
      .limit(size)
      .getMany();
    page.total = await queryBuilder.getCount();
    const result = new PageResponseResult<MenuEntity[]>(
      ResponseStatus.success,
      "操作成功",
      page.total,
      entities
    );
    return result;
  }

  /**
   * 获取菜单列表
   * @returns Promise<ResponseResult<MenuEntity[]>>
   */
  async getMenuList(): Promise<ResponseResult<MenuEntity[]>> {
    const entities = await this.menuRepository.find();
    const result = new ResponseResult<MenuEntity[]>(
      ResponseStatus.success,
      "操作成功",
      entities
    );
    return result;
  }

  /**
   * 根据菜单id获取菜单信息
   * @param id 主键
   * @returns Promise<ResponseResult<MenuEntity>>
   */
  async getMenuById(id: number): Promise<ResponseResult<MenuEntity>> {
    const entity = await this.menuRepository.findOne({
      where: {
        id,
      },
    });
    const result = new ResponseResult<MenuEntity>(
      ResponseStatus.success,
      "操作成功",
      entity
    );
    return result;
  }

  /**
   * 根据菜单名称获取菜单信息
   * @param menuName 菜单名称
   * @returns
   */
  async getMenuByMenuName(menuName: string) {
    const entity = await this.menuRepository.findOneBy({
      menuName,
    });
    const result = new ResponseResult<MenuEntity>(
      ResponseStatus.success,
      "操作成功",
      entity
    );
    return result;
  }

  /**
   * 创建菜单
   * @param createUserDto 创建菜单dto
   * @returns  Promise<ResponseResult>
   */
  async createMenu(createMenuDto: CreateMenuDto): Promise<ResponseResult> {
    const menu = await this.menuRepository.findOneBy({
      menuId: createMenuDto.menuId,
      menuName: createMenuDto.menuName,
      pId: createMenuDto.pId,
    });
    if (menu) {
      throw new HttpException("操作失败,菜单名已使用.", HttpStatus.BAD_REQUEST);
    }
    const menuEntity = new MenuEntity();
    toEntity(createMenuDto, menuEntity);
    await this.menuRepository.insert(menuEntity);
    const result = new ResponseResult(ResponseStatus.success, "操作成功");
    return result;
  }

  /**
   * 修改菜单
   * @param id 主键
   * @param updateUserDto 修改菜单dto
   * @returns Promise<ResponseResult>
   */
  async updateMenuById(id: number, updateMenuDto: UpdateMenuDto) {
    const menu = await this.getMenuById(id);
    if (!menu) {
      throw new HttpException(
        "操作失败,未找到菜单信息.",
        HttpStatus.BAD_REQUEST
      );
    }
    const menuEntity = new MenuEntity();
    toEntity(updateMenuDto, menuEntity);
    await this.menuRepository.update(id, menuEntity);
  }

  /**
   * 删除菜单
   * @param id 主键
   * @returns  Promise<ResponseResult>
   */
  async removeMenuById(id: number) {
    await this.menuRepository.delete(id);
    const result = new ResponseResult<MenuEntity>(
      ResponseStatus.success,
      "操作成功"
    );
    return result;
  }
}
