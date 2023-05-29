import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { toEntity } from 'src/utils/dto2Entity';
import { Repository } from 'typeorm';
import { CreateMenuDto } from './dto/create-menu.dto';
import { SearchMenuDto } from './dto/search-menu.dto';
import { UpdateMenuDto } from './dto/update-menu.dto';
import { MenuEntity } from './entities/menu.entity';

@Injectable()
export class MenuService {
  @InjectRepository(MenuEntity)
  private readonly menuRepository: Repository<MenuEntity>;

  async getMenuPageList(searchMenuDto: SearchMenuDto) {
    const { page, keyword } = searchMenuDto;
    const { current, size } = page;
    const skip = (current - 1) * size;
    const queryBuilder = this.menuRepository.createQueryBuilder();
    if (keyword) {
      queryBuilder.where(`menu_name=:menuName`, { menuName: keyword });
    }
    const list = await queryBuilder
      .orderBy('create_time', 'DESC')
      .offset(skip)
      .limit(size)
      .getMany();
    page.total = await this.menuRepository.count();
    return {
      payload: list,
      total: page.total,
    };
  }

  getMenuList() {
    return this.menuRepository.find();
  }

  getMenuById(id: number) {
    return this.menuRepository.findOne({
      where: {
        id,
      },
    });
  }

  getMenuByMenuName(menuName: string) {
    return this.menuRepository.findOneBy({
      menuName,
    });
  }

  async createMenu(createMenuDto: CreateMenuDto) {
    const menu = await this.menuRepository.findOneBy({
      menuName: createMenuDto.menuName,
    });
    if (menu) {
      throw new HttpException('操作失败,菜单名已使用.', HttpStatus.BAD_REQUEST);
    }
    const menuEntity = new MenuEntity();
    toEntity(createMenuDto, menuEntity);
    await this.menuRepository.insert(menuEntity);
  }

  async updateMenuById(id: number, updateMenuDto: UpdateMenuDto) {
    const menu = await this.getMenuById(id);
    if (!menu) {
      throw new HttpException(
        '操作失败,未找到菜单信息.',
        HttpStatus.BAD_REQUEST
      );
    }
    const menuEntity = new MenuEntity();
    toEntity(updateMenuDto, menuEntity);
    await this.menuRepository.update(id, menuEntity);
  }

  async removeMenuById(id: number) {
    await this.menuRepository.delete(id);
  }
}
