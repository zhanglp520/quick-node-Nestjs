import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";
import { ApiProperty } from "@nestjs/swagger";

@Entity()
export class BaseEntity {
  @ApiProperty({ description: "主键" })
  @PrimaryGeneratedColumn()
  id: number;
}
