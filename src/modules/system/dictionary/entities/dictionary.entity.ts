import { AutoMap } from '@automapper/classes';
import { BaseEntity, Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('sys_dictionaries')
export class DictionaryEntity extends BaseEntity {
  @AutoMap()
  @PrimaryGeneratedColumn()
  id: number;

  @AutoMap()
  @Column({ type: 'varchar', name: 'dic_id' })
  dicId: string;

  @AutoMap()
  @Column({ type: 'varchar', name: 'dic_name' })
  dicName: string;

  @AutoMap()
  @Column({ type: 'varchar', name: 'dic_type_id' })
  dicTypeId: string;
}
