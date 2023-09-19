import { MenuType } from "@/common/enums/menu.enum";
import { BaseEntity } from "@/entities/base.entity";
import { ApiProperty } from "@nestjs/swagger";
import { Transform } from "class-transformer";
import { Column, Entity } from "typeorm";

// eslint-disable-next-line @typescript-eslint/no-var-requires
const moment = require("moment");

@Entity("sys_menus")
export class MenuEntity extends BaseEntity {
  @ApiProperty({ description: "菜单编号" })
  @Column({ name: "menu_id" })
  menuId: string;

  @ApiProperty({ description: "菜单名称" })
  @Column({ name: "menu_name" })
  menuName: string;

  @ApiProperty({ description: "路由地址" })
  @Column()
  path: string;

  @ApiProperty({ description: "视图路径" })
  @Column({ name: "view_path" })
  viewPath: string;

  @ApiProperty({ description: "类型" })
  @Column({
    name: "menu_type",
    type: "enum",
    enum: MenuType,
    default: MenuType.menu,
  })
  menuType: MenuType;

  @ApiProperty({ description: "图标" })
  @Column()
  icon: string;

  @ApiProperty({ description: "排序" })
  @Column()
  sort: number;

  @ApiProperty({ description: "父级菜单" })
  @Column({ name: "p_id" })
  pId: number;

  @ApiProperty({ description: "链接" })
  @Column({ type: "int" })
  link: string;

  @ApiProperty({ description: "链接地址" })
  @Column({ name: "link_url" })
  linkUrl: string;

  @ApiProperty({ description: "状态" })
  @Column({ type: "int" })
  status: boolean;

  @ApiProperty({ description: "缓存" })
  @Column({ type: "int" })
  cache: boolean;

  @ApiProperty({ description: "删除" })
  @Column({ type: "int", default: 0 })
  deleted?: boolean;

  @ApiProperty({ description: "启用" })
  @Column({ type: "int", default: 1 })
  enabled?: boolean;

  @ApiProperty({ description: "创建时间" })
  @Transform((createTime: any) =>
    moment(createTime.value).format("YYYY-MM-DD HH:mm:ss")
  )
  @Column({ type: "datetime", name: "create_time" })
  createTime: Date;

  @ApiProperty({ description: "备注" })
  @Column({ type: "varchar" })
  remark: string;
}
