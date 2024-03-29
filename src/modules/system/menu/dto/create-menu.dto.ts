import { Cached } from "@/common/enums/cached.enum";
import { Display } from "@/common/enums/display.enum";
import { Enabled } from "@/common/enums/enabled.enum";
import { MenuType } from "@/common/enums/menu.enum";
import { ApiProperty, ApiPropertyOptional } from "@nestjs/swagger";

export class CreateMenuDto {
  @ApiProperty({ description: "菜单编号" })
  menuId: string;

  @ApiProperty({ description: "菜单名称" })
  menuName: string;

  @ApiProperty({ description: "菜单类型" })
  menuType: MenuType;

  @ApiPropertyOptional({ description: "路由" })
  path: string;

  @ApiPropertyOptional({ description: "视图" })
  viewPath: string;

  @ApiPropertyOptional({ description: "图标" })
  icon: string;

  @ApiPropertyOptional({ description: "排序" })
  sort: number;

  @ApiPropertyOptional({ description: "父菜单" })
  pId: number;

  @ApiPropertyOptional({ description: "外链" })
  link: number;

  @ApiPropertyOptional({ description: "外链地址" })
  linkUrl: string;

  @ApiPropertyOptional({ description: "启用" })
  enabled: Enabled;

  @ApiPropertyOptional({ description: "显示" })
  status: Display;

  @ApiPropertyOptional({ description: "缓存" })
  cache: Cached;

  @ApiPropertyOptional({ description: "备注" })
  remark: string;
}
