import { Transform } from "class-transformer";
import { BaseEntity, Column, Entity, PrimaryGeneratedColumn } from "typeorm";
const moment = require("moment");

@Entity("dev_physical_models")
export class PhysicalModelEntity extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;
  @Column({ type: "int", name: "product_id" })
  productId: number;
  @Column({ type: "varchar" })
  attributes: string;
  @Column({ type: "varchar" })
  functions: string;
  @Column({ type: "varchar" })
  events: string;
}
