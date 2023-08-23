import { PartialType } from '@nestjs/mapped-types';
import { CreateNoticeTemplateDto } from './create-notice-template.dto';

export class UpdateNoticeTemplateDto extends PartialType(
  CreateNoticeTemplateDto
) {}
