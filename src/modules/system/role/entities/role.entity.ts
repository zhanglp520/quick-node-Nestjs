import { BaseEntity, Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('sys_roles')
export class RoleEntity extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;
  @Column({ type: 'varchar', name: 'role_id' })
  roleId: string;
  @Column({ type: 'varchar', name: 'role_name' })
  roleName: string;
}
