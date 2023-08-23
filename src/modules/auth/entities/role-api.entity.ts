import { AutoMap } from '@automapper/classes';
import { BaseEntity, Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('per_role_apis')
export class RoleApiEntity extends BaseEntity {
  @AutoMap()
  @PrimaryGeneratedColumn()
  id: number;

  @AutoMap()
  @Column({ type: 'int', name: 'role_id' })
  roleId: number;

  @AutoMap()
  @Column({ type: 'int', name: 'api_id' })
  apiId: number;
}
