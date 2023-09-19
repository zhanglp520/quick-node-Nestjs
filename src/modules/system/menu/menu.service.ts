import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { toEntity } from "src/utils/dto2Entity";
import { Repository } from "typeorm";
import { CreateMenuDto } from "./dto/create-menu.dto";
import { SearchMenuDto } from "./dto/search-menu.dto";
import { UpdateMenuDto } from "./dto/update-menu.dto";
import { MenuEntity } from "./entities/menu.entity";
import { PageResponseResult } from "@/common/tools/page.response.result";
import { Deleted } from "@/common/enums/deleted.enum";

@Injectable()
export class MenuService {
  @InjectRepository(MenuEntity)
  private readonly menuRepository: Repository<MenuEntity>;

  /**
   * 获取菜单分页列表
   * @param searchMenuDto 搜索dto
   */
  async getMenuPageList(searchMenuDto: SearchMenuDto) {
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
    const result = new PageResponseResult<MenuEntity[]>(page.total, entities);
    return result;
  }

  /**
   * 获取菜单列表
   */
  async getMenuList() {
    const entities = await this.menuRepository.find();
    return entities;
  }

  /**
   * 根据菜单id获取菜单信息
   * @param id 主键
   */
  async getMenuById(id: number) {
    const entity = await this.menuRepository.findOne({
      where: {
        id,
      },
    });
    return entity;
  }

  /**
   * 根据菜单名称获取菜单信息
   * @param menuName 菜单名称
   */
  async getMenuByMenuName(menuName: string) {
    const entity = await this.menuRepository.findOneBy({
      menuName,
    });
    return entity;
  }

  /**
   * 创建菜单
   * @param createUserDto 创建菜单dto
   */
  async createMenu(createMenuDto: CreateMenuDto) {
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
    menuEntity.deleted = Deleted.NoDeleted;
    await this.menuRepository.insert(menuEntity);
  }

  /**
   * 修改菜单
   * @param id 主键
   * @param updateUserDto 修改菜单dto
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
   */
  async removeMenuById(id: number) {
    await this.menuRepository.delete(id);
  }
}
