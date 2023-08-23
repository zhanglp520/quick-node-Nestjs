import { PartialType } from "@nestjs/mapped-types";
import { CreateAlarmRecordDto } from "./create-alarm-record.dto";

export class UpdateAlarmRecordDto extends PartialType(CreateAlarmRecordDto) {}
