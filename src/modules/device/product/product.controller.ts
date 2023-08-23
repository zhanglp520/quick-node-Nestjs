import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  Query,
  Put,
  Patch,
} from '@nestjs/common';
import { ProductService } from './product.service';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { SearchProductDto } from './dto/search-product.dto';

@Controller('/device/products')
export class ProductController {
  constructor(private readonly productService: ProductService) {}

  @Get()
  getPageList(
    @Query('productType') productType,
    @Query('keyword') keyword,
    @Query('current') current,
    @Query('size') size
  ) {
    const searchProductDto = new SearchProductDto();
    searchProductDto.productType = productType;
    searchProductDto.keyword = keyword;
    searchProductDto.page = {
      current,
      size,
    };
    return this.productService.getProductPageList(searchProductDto);
  }

  @Get('getProductList')
  async getProductList() {
    const list = await this.productService.getProductList();
    return list;
  }

  @Get(':id')
  getProductById(@Param('id') id: string) {
    return this.productService.getProductById(+id);
  }

  @Get('getProductByProductName/:productName')
  getProductByProductName(@Param('productName') productName: string) {
    return this.productService.getProductByProductName(productName);
  }

  @Post()
  createProduct(@Body() createProductDto: CreateProductDto) {
    return this.productService.createProduct(createProductDto);
  }

  @Put(':id')
  updateProductById(
    @Param('id') id: string,
    @Body() updateProductDto: UpdateProductDto
  ) {
    return this.productService.updateProductById(+id, updateProductDto);
  }

  @Delete(':id')
  removeProductById(@Param('id') id: string) {
    return this.productService.removeProductById(+id);
  }
  @Patch('enabled/:id')
  enabled(@Param('id') id: string) {
    return this.productService.enabledProductById(+id);
  }
  @Patch('disable/:id')
  disable(@Param('id') id: string) {
    return this.productService.disableProductById(+id);
  }
}
