import { Entity, PrimaryGeneratedColumn } from "typeorm";
import { AutoMap } from "@automapper/classes";
import { ApiProperty } from "@nestjs/swagger";

@Entity()
export class BaseEntity {
  @ApiProperty({ description: "主键" })
  @AutoMap()
  @PrimaryGeneratedColumn()
  id: number;
}
