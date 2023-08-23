import { ApiExtraModels } from "@nestjs/swagger";
import { CreateDeptDto } from "./create-dept.dto";

// @ApiExtraModels(CreateDeptDto)
export class UpdateDeptDto extends CreateDeptDto {}
