import { BaseEntity, Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('per_user_roles')
export class UserRoleEntity extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;
  @Column({ type: 'int', name: 'user_id' })
  userId: number;
  @Column({ type: 'int', name: 'role_id' })
  roleId: number;
}
