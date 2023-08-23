import { PageDto } from 'src/dtos/page.dto';

export class SearchFunctionDto {
  deviceId: number;
  identifying: string;
  keyword: string;
  page: PageDto;
}
