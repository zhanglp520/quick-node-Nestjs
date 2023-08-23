import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  Put,
} from '@nestjs/common';
import { ProductTypeService } from './product-type.service';
import { CreateProductTypeDto } from './dto/create-product-type.dto';
import { UpdateProductTypeDto } from './dto/update-product-type.dto';

@Controller('device/productTypes')
export class ProductTypeController {
  constructor(private readonly productTypeService: ProductTypeService) {}

  // @Get()
  // getPageList(
  //   @Query('keyword') keyword,
  //   @Query('current') current,
  //   @Query('size') size
  // ) {
  //   const searchProductTypeDto = new SearchProductTypeDto();
  //   searchProductTypeDto.keyword = keyword;
  //   searchProductTypeDto.page = {
  //     current,
  //     size,
  //   };
  //   searchProductTypeDto.keyword = keyword;
  //   return this.productTypeService.getProductTypePageList(searchProductTypeDto);
  // }

  // @Get('/getProductTypeList')
  @Get()
  async getProductTypeList() {
    const list = await this.productTypeService.getProductTypeList();
    return list;
  }

  @Get(':id')
  getProductTypeById(@Param('id') id: string) {
    return this.productTypeService.getProductTypeById(+id);
  }

  @Get('getProductTypeByProductTypeName/:productTypeName')
  getProductTypeByProductTypeName(
    @Param('productTypeName') productTypeName: string
  ) {
    return this.productTypeService.getProductTypeByProductTypeName(
      productTypeName
    );
  }

  @Post()
  createProductType(@Body() createProductTypeDto: CreateProductTypeDto) {
    return this.productTypeService.createProductType(createProductTypeDto);
  }

  @Put(':id')
  updateProductTypeById(
    @Param('id') id: string,
    @Body() updateProductTypeDto: UpdateProductTypeDto
  ) {
    return this.productTypeService.updateProductTypeById(
      +id,
      updateProductTypeDto
    );
  }

  @Delete(':id')
  removeProductTypeById(@Param('id') id: string) {
    return this.productTypeService.removeProductTypeById(+id);
  }
}
