import { BaseEntity, Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('notice_configs')
export class NoticeConfigEntity extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;
  @Column({ type: 'varchar', name: 'config_id' })
  configId: string;
  @Column({ type: 'varchar', name: 'config_name' })
  configName: string;
}
