import { PageDto } from "src/dtos/page.dto";

export class SearchProductDto {
  keyword: string;
  page: PageDto;
  productType: string;
}
