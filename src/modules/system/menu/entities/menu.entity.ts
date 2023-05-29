import { BaseEntity, Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('sys_menus')
export class MenuEntity extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;
  @Column({ name: 'menu_id' })
  menuId: string;
  @Column({ name: 'menu_name' })
  menuName: string;
  @Column()
  path: string;
  @Column({ name: 'view_path' })
  viewPath: string;
  @Column({ name: 'menu_type' })
  menuType: string;
  @Column()
  icon: string;
  @Column()
  sort: number;
  @Column()
  btns: string;
  @Column({ name: 'p_id' })
  pId: number;
  @Column({ type: 'int' })
  link: string;
  @Column({ name: 'link_url' })
  linkUrl: string;
  @Column({ type: 'int' })
  enabled: boolean;
  @Column({ type: 'int' })
  status: boolean;
}
