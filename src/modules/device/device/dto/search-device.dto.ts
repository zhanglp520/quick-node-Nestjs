import { PageDto } from 'src/dtos/page.dto';

export class SearchDeviceDto {
  productId: number;
  keyword: string;
  page: PageDto;
}
