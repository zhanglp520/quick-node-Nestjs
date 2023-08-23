import { AutoMap } from '@automapper/classes';
import {
  BaseEntity,
  Column,
  Entity,
  PrimaryGeneratedColumn,
  PrimaryColumnCannotBeNullableError,
  OneToMany,
  ManyToMany,
  JoinTable,
  //   JoinTable,
  //   ManyToMany,
} from 'typeorm';
import { RoleEntity } from '../../role/entities/role.entity';
import { UserRoleEntity } from '@/modules/auth/entities/user-role.entity';

@Entity('sys_users')
export class UserEntity extends BaseEntity {
  @AutoMap()
  @PrimaryGeneratedColumn({ type: 'int' })
  id?: number;

  @AutoMap()
  @Column({ type: 'varchar', name: 'user_id' })
  userId: string;

  @AutoMap()
  @Column({ type: 'varchar', name: 'user_name' })
  userName: string;

  @AutoMap()
  @Column({ type: 'varchar', default: 'e10adc3949ba59abbe56e057f20f883e' })
  password: string;

  @AutoMap()
  @Column({ type: 'varchar' })
  avatar: string;

  @AutoMap()
  @Column({ type: 'varchar', name: 'full_name' })
  fullName: string;

  @AutoMap()
  @Column({ type: 'varchar' })
  phone: string;

  @AutoMap()
  @Column({ type: 'varchar' })
  email: string;

  @AutoMap()
  @Column({ type: 'varchar' })
  address: string;

  @AutoMap()
  @Column({ type: 'datetime', name: 'create_time', default: new Date() })
  createTime: Date;

  @AutoMap()
  @Column({ type: 'varchar' })
  remark: string;

  @AutoMap()
  @Column({ type: 'int', default: 0 })
  deleted: boolean;

  @AutoMap()
  @Column({ type: 'int', default: 1 })
  enabled: boolean;

  // @AutoMap()
  // @OneToMany(() => UserRoleEntity, (ur) => ur.user)
  // @JoinTable({
  //   name: 'per_user_roles',
  // })
  // userRoles: UserRoleEntity[];

  // @AutoMap()
  // roles: number[];

  @AutoMap()
  @ManyToMany(() => RoleEntity, (role) => role.users)
  // @JoinTable()
  @JoinTable({
    name: 'per_user_roles',
    joinColumns: [{ name: 'user_id' }],
    inverseJoinColumns: [{ name: 'role_id' }],
  })
  // @Column({ type: 'int', default: 1 })
  @AutoMap()
  roles: RoleEntity[];

  // @AutoMap()
  // roleIds: number[];
}
