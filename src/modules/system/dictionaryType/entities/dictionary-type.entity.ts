import { BaseEntity, Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('sys_dictionaries_type')
export class DictionaryTypeEntity extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;
  @Column({ type: 'varchar', name: 'dic_type_id' })
  dicTypeId: string;
  @Column({ type: 'varchar', name: 'dic_type_name' })
  dicTypeName: string;
}
