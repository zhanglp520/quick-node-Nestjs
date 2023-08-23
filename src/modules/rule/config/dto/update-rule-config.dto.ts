import { PartialType } from '@nestjs/mapped-types';
import { CreateRuleConfigDto } from './create-rule-config.dto';

export class UpdateRuleConfigDto extends PartialType(CreateRuleConfigDto) {}
