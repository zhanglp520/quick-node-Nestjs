import { PartialType } from "@nestjs/mapped-types";
import { CreatePhysicalModelDto } from "./create-physical-model.dto";

export class UpdatePhysicalModelDto extends PartialType(
  CreatePhysicalModelDto
) {}
