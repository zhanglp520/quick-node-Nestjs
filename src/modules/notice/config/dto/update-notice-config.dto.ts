import { PartialType } from "@nestjs/mapped-types";
import { CreateNoticeConfigDto } from "./create-notice-config.dto";

export class UpdateNoticeConfigDto extends PartialType(CreateNoticeConfigDto) {}
