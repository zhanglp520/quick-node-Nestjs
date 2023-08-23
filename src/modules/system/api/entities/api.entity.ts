import { AutoMap } from '@automapper/classes';
import { Transform } from 'class-transformer';
import {
  BaseEntity,
  Column,
  Entity,
  JoinTable,
  ManyToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { RoleEntity } from '../../role/entities/role.entity';

@Entity('sys_apis')
export class ApiEntity extends BaseEntity {
  @AutoMap()
  @PrimaryGeneratedColumn({ type: 'int' })
  id?: number;

  @AutoMap()
  @Column({ type: 'varchar', name: 'api_id' })
  apiId: string;

  @AutoMap()
  @Column({ type: 'varchar', name: 'api_name' })
  apiName: string;

  @AutoMap()
  @Column({ type: 'varchar', name: 'api_path' })
  apiPath: string;

  @AutoMap()
  @Column({ type: 'datetime', name: 'create_time', default: new Date() })
  createTime: Date;

  @AutoMap()
  @Column({ type: 'varchar' })
  remark: string;

  @AutoMap()
  @ManyToMany(() => RoleEntity, (role) => role.apis)
  // @JoinTable()
  @JoinTable({
    name: 'per_role_apis',
    joinColumns: [{ name: 'api_id' }],
    inverseJoinColumns: [{ name: 'role_id' }],
  })
  // @Column({ type: 'int', default: 1 })
  @AutoMap()
  roles: RoleEntity[];
}
