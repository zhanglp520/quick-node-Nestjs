import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";
import { ApiProperty } from "@nestjs/swagger";

@Entity()
export abstract class BaseEntity {
  @ApiProperty({ description: "主键" })
  @PrimaryGeneratedColumn()
  id: number;
}
