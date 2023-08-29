import { AutoMap } from "@automapper/classes";
import { BaseEntity, Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity("sys_dictionary_types")
export class DictionaryTypeEntity extends BaseEntity {
  @AutoMap()
  @PrimaryGeneratedColumn()
  id: number;

  @AutoMap()
  @Column({ type: "varchar", name: "dic_type_id" })
  dicTypeId: string;

  @AutoMap()
  @Column({ type: "varchar", name: "dic_type_name" })
  dicTypeName: string;
}
