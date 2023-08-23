import { BaseEntity, Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import { Transform } from 'class-transformer';
const moment = require('moment');

@Entity('dev_physical_model_function_records')
export class FunctionEntity extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;
  @Column({ type: 'varchar' })
  identifying: string;
  @Column({ type: 'varchar', name: 'input_params' })
  inputParams: string;
  @Column({ type: 'varchar', name: 'out_params' })
  outParams: string;
  @Column({ type: 'int', name: 'device_id' })
  deviceId: number;
  @Transform((createTime: any) =>
    moment(createTime.value).format('YYYY-MM-DD HH:mm:ss')
  )
  @Column({ type: 'datetime', name: 'create_time', default: new Date() })
  createTime: Date;
}
