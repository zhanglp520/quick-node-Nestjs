import { BaseEntity, Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity("notice_templates")
export class NoticeTemplateEntity extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;
  @Column({ type: "varchar", name: "template_id" })
  templateId: string;
  @Column({ type: "varchar", name: "template_name" })
  templateName: string;
}
