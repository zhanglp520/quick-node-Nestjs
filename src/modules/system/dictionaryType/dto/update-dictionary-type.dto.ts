import { PartialType } from '@nestjs/mapped-types';
import { CreateDictionaryTypeDto } from './create-dictionary-type.dto';

export class UpdateDictionaryTypeDto extends PartialType(
  CreateDictionaryTypeDto
) {}
