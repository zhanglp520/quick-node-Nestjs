import { BaseEntity, Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import { AutoMap } from '@automapper/classes';

@Entity('sys_depts')
export class DeptEntity extends BaseEntity {
  @AutoMap()
  @PrimaryGeneratedColumn({ type: 'int' })
  id?: number;

  @AutoMap()
  @Column({ type: 'varchar', name: 'dept_id' })
  deptId: string;

  @AutoMap()
  @Column({ type: 'varchar', name: 'dept_name' })
  deptName: string;

  @AutoMap()
  @Column({ type: 'varchar', name: 'p_id' })
  pId: string;
}
