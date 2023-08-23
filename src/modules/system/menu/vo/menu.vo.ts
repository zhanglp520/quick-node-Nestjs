import { ApiProperty } from "@nestjs/swagger";
import { AutoMap } from "@automapper/classes";
import { BaseVo } from "src/vos/base.dto";

export class MenuVo extends BaseVo {
  @ApiProperty({ description: "菜单编号" })
  @AutoMap()
  menuId: string;

  @ApiProperty({ description: "菜单名称" })
  @AutoMap()
  menuName: string;

  @ApiProperty({ description: "路由" })
  @AutoMap()
  path: string;

  @ApiProperty({ description: "视图" })
  @AutoMap()
  viewPath: string;

  @ApiProperty({ description: "菜单类型" })
  @AutoMap()
  menuType: string;

  @ApiProperty({ description: "图标" })
  @AutoMap()
  icon: string;

  @ApiProperty({ description: "排序" })
  @AutoMap()
  sort: number;

  @ApiProperty({ description: "父级菜单编号" })
  @AutoMap()
  pId: number;

  @ApiProperty({ description: "外链" })
  @AutoMap()
  link: string;

  @ApiProperty({ description: "外链地址" })
  @AutoMap()
  linkUrl: string;

  @ApiProperty({ description: "启用" })
  @AutoMap()
  enabled: boolean;

  @ApiProperty({ description: "删除" })
  @AutoMap()
  status: boolean;

  @ApiProperty({ description: "缓存" })
  @AutoMap()
  cache: boolean;
}
