import { BaseEntity, Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('sys_dictionaries')
export class DictionaryEntity extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;
  @Column({ type: 'varchar', name: 'dic_id' })
  dicId: string;
  @Column({ type: 'varchar', name: 'dic_name' })
  dicName: string;
  @Column({ type: 'varchar', name: 'dic_type_id' })
  dicTypeId: string;
}
