import { BaseEntity, Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('sys_depts')
export class DeptEntity extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;
  @Column({ type: 'varchar', name: 'dept_id' })
  deptId: string;
  @Column({ type: 'varchar', name: 'dept_name' })
  deptName: string;
  @Column({ type: 'varchar', name: 'p_id' })
  pId: string;
}
