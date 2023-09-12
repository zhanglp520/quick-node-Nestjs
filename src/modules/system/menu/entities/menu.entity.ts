import { AutoMap } from "@automapper/classes";
import { BaseEntity, Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity("sys_menus")
export class MenuEntity extends BaseEntity {
  @AutoMap()
  @PrimaryGeneratedColumn()
  id: number;

  @AutoMap()
  @Column({ name: "menu_id" })
  menuId: string;

  @AutoMap()
  @Column({ name: "menu_name" })
  menuName: string;

  @AutoMap()
  @Column()
  path: string;

  @AutoMap()
  @Column({ name: "view_path" })
  viewPath: string;

  @AutoMap()
  @Column({ name: "menu_type" })
  menuType: string;

  @AutoMap()
  @Column()
  icon: string;

  @AutoMap()
  @Column()
  sort: number;

  @AutoMap()
  @Column({ name: "p_id" })
  pId: number;

  @AutoMap()
  @Column({ type: "int" })
  link: string;

  @AutoMap()
  @Column({ name: "link_url" })
  linkUrl: string;

  @AutoMap()
  @Column({ type: "int" })
  enabled: boolean;

  @AutoMap()
  @Column({ type: "int" })
  status: boolean;

  @AutoMap()
  @Column({ type: "int" })
  cache: boolean;
}
