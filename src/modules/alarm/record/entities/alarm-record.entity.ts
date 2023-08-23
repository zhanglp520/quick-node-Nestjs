import { BaseEntity, Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('alarm_records')
export class AlarmRecordEntity extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;
  @Column({ type: 'varchar', name: 'record_id' })
  recordId: string;
  @Column({ type: 'varchar', name: 'record_name' })
  recordName: string;
}
