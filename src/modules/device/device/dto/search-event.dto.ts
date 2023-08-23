import { PageDto } from 'src/dtos/page.dto';

export class SearchEventDto {
  deviceId: number;
  identifying: string;
  keyword: string;
  page: PageDto;
}
