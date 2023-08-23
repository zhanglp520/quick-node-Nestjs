import { PartialType } from "@nestjs/mapped-types";
import { CreateAlarmConfigDto } from "./create-alarm-config.dto";

export class UpdateAlarmConfigDto extends PartialType(CreateAlarmConfigDto) {}
