import { BaseEntity, Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('per_role_menus')
export class RoleMenuEntity extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;
  @Column({ type: 'int', name: 'role_id' })
  roleId: number;
  @Column({ type: 'int', name: 'menu_id' })
  menuId: number;
}
