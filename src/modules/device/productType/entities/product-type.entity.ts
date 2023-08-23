import { Transform } from 'class-transformer';
import { BaseEntity, Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
const moment = require('moment');

@Entity('dev_product_types')
export class ProductTypeEntity extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;
  @Column({ name: 'product_type_id' })
  productTypeId: string;
  @Column({ name: 'product_type_name' })
  productTypeName: string;
  @Column({ name: 'p_id' })
  pId: number;
  @Transform((createTime: any) =>
    moment(createTime.value).format('YYYY-MM-DD HH:mm:ss')
  )
  @Column({ type: 'datetime', name: 'create_time', default: new Date() })
  createTime: Date;
  @Column({ type: 'varchar' })
  remark: string;
}
