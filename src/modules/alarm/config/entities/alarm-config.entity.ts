import { BaseEntity, Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('alarm_configs')
export class AlarmConfigEntity extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;
  @Column({ type: 'varchar', name: 'config_id' })
  configId: string;
  @Column({ type: 'varchar', name: 'config_name' })
  configName: string;
}
