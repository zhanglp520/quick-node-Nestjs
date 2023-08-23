import { PageDto } from 'src/dtos/page.dto';

export class SearchAttributeDto {
  productId: number;
  deviceId: number;
  identifying: string;
  keyword: string;
  page: PageDto;
}
