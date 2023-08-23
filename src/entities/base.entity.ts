import { Entity, PrimaryGeneratedColumn } from "typeorm";
import { AutoMap } from "@automapper/classes";

@Entity()
export class BaseEntity {
  @AutoMap()
  @PrimaryGeneratedColumn()
  id: number;
}
