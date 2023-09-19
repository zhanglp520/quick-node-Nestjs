import { BaseEntity } from "@/entities/base.entity";
import { ApiProperty } from "@nestjs/swagger";
import { Transform } from "class-transformer";
import { Column, Entity } from "typeorm";

// eslint-disable-next-line @typescript-eslint/no-var-requires
const moment = require("moment");

@Entity("sys_dictionary_types")
export class DictionaryTypeEntity extends BaseEntity {
  @ApiProperty({ description: "字典分类编号" })
  @Column({ type: "varchar", name: "dic_type_id" })
  dicTypeId: string;

  @ApiProperty({ description: "字典分类名称" })
  @Column({ type: "varchar", name: "dic_type_name" })
  dicTypeName: string;

  @ApiProperty({ description: "创建时间" })
  @Transform((createTime: any) =>
    moment(createTime.value).format("YYYY-MM-DD HH:mm:ss")
  )
  @Column({ type: "datetime", name: "create_time" })
  createTime: Date;

  @ApiProperty({ description: "备注" })
  @Column({ type: "varchar" })
  remark: string;
}
