import { Transform } from 'class-transformer';
import {
  BaseEntity,
  Column,
  Entity,
  PrimaryGeneratedColumn,
  PrimaryColumnCannotBeNullableError,
  //   JoinTable,
  //   ManyToMany,
} from 'typeorm';
const moment = require('moment');

@Entity('sys_users')
export class UserEntity extends BaseEntity {
  @PrimaryGeneratedColumn({ type: 'int' })
  id?: number;
  @Column({ type: 'varchar', name: 'user_id' })
  userId: string;
  @Column({ type: 'varchar', name: 'user_name' })
  userName: string;
  @Column({ type: 'varchar', default: 'e10adc3949ba59abbe56e057f20f883e' })
  password: string;
  @Column({ type: 'varchar' })
  avatar: string;
  @Column({ type: 'varchar', name: 'full_name' })
  fullName: string;
  @Column({ type: 'varchar' })
  phone: string;
  @Column({ type: 'varchar' })
  email: string;
  @Column({ type: 'varchar' })
  address: string;
  @Transform((createTime: any) =>
    moment(createTime.value).format('YYYY-MM-DD HH:mm:ss')
  )
  @Column({ type: 'datetime', name: 'create_time', default: new Date() })
  createTime: Date;
  @Column({ type: 'varchar' })
  remark: string;
  @Column({ type: 'int', default: 0 })
  deleted: boolean;
  @Column({ type: 'int', default: 1 })
  enabled: boolean;
}
